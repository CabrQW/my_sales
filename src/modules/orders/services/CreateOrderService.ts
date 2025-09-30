import { Product } from "@modules/products/database/entities/Product";
import { Order } from "../database/entities/Order";
import { customerRepository } from "@modules/customers/database/repositories/CustomerRepositories";
import AppError from "@shared/errors/AppError";
import { productsRepositoreis } from "@modules/products/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";
import RedisCache from "@shared/cache/RedisCache";

interface ICreateOrder {
  customer_id: string;
  products: Product[]
}


export class createOrderService {
  async execute({customer_id, products}: ICreateOrder): Promise<Order>{
    const customerExists = await customerRepository.findById(
      Number(customer_id)
    )
    const redisCache = new RedisCache()

    if(!customerExists) {
      throw new AppError('Could not find any customer with the given id.')
    }

    const existentProducts = await productsRepositoreis.findAllByIds(products)

    if(!existentProducts.length) {
      throw new AppError('Could not find any customer with the given id.')
    }

    const existentProductsIds =  products.map(product => product.id)

    const checkInexistentProducts = products.filter(product => !existentProductsIds.includes(product.id))

    if(checkInexistentProducts.length) {
      throw new AppError(`could not find product ${checkInexistentProducts[0].id}`, 404)
    }

    const quantityAvailable = products.filter(product => {
      existentProducts.filter(productExisten => productExisten.id === product.id) [0].quantity < product.quantity;
    })

    if(!quantityAvailable.length){
      throw new AppError(`The quantity is not available `,409)
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(p => p.id == product.id) [0].price
    }))

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      product: serializedProducts
    })

    const{ order_products } = order
    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existentProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))

    await productsRepositoreis.save(updateProductQuantity)
    await redisCache.invalidate('api-mysales-PRODUCT_LIST')

    return order
  }
}