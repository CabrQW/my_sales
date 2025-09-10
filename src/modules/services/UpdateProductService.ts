import { Product } from "@modules/database/entities/Product";
import { productsRepositoreis } from "@modules/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";

interface IUpdateProduct {
  id: string,
  name: string,
  price: number,
  quantity: number
}

export default class UpdateProductService {
  async execute({ id, name, price, quantity}: IUpdateProduct): Promise<Product> {
        const product = await productsRepositoreis.findById(id)

        if (!product) {
          throw new AppError ("Product not found.", 404)
        }

        const productExists = await productsRepositoreis.findByName(name)
        if(productExists && productExists.id !== id){
          throw new AppError('There is already one product with this name',405)
        }

        product.name = name
        product.price = price
        product.quantity = quantity

        await productsRepositoreis.save(product)

        return product
  }
}