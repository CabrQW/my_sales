import { Product } from "@modules/products/database/entities/Product";
import { productsRepositoreis } from "@modules/products/repositories/ProductsRepositories"
import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";


interface ICreateProduct{
  name: string,
  price: number,
  quantity: number
}

export default class CreateProductService{
  async execute({name,price,quantity}: ICreateProduct): Promise<Product>{
    const redisCache = new RedisCache()
    const productExists = await productsRepositoreis.findByName(name);

    if(productExists){
      throw new AppError("There is already one product with this name", 400)
    }

    const product = productsRepositoreis.create({
      name,
      price,
      quantity,
    });

    await productsRepositoreis.save(product)
    await redisCache.invalidate('api-mysales-PRODUCT_LIST')

    return product
  }
}
