import { Product } from "@modules/products/database/entities/Product";
import { productsRepositoreis } from "@modules/products/repositories/ProductsRepositories"
import RedisCache from "@shared/cache/RedisCache";

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT_LIST'
    )

    if(!products) {
      products = await productsRepositoreis.find()

      await redisCache.save('api-mysales-PRODUCT_LIST', JSON.stringify(products))
    }

    return products
  }
}
