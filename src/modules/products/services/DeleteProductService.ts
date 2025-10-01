import { productsRepositoreis } from "@modules/products/infra/database/repositories/ProductsRepositories"
import RedisCache from "@shared/cache/RedisCache"
import AppError from "@shared/errors/AppError"

interface IDeleteProduct {
  id: string
}


export default class DeleteProductService {
  async execute({id}: IDeleteProduct): Promise<void>{
    const redisCache = new RedisCache()
    const product = await productsRepositoreis.findById(id)

    if (!product) {
      throw new AppError("Delete not found", 404)
    }

    await redisCache.invalidate('api-mysales-PRODUCT_LIST')

    await productsRepositoreis.remove(product)
  }
}
