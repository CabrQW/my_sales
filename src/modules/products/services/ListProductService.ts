import { Product } from "@modules/database/entities/Product";
import { productsRepositoreis } from "@modules/repositories/ProductsRepositories"

export default class ListProductService {
  async Execute(): Promise<Product[]> {
    const products = await productsRepositoreis.find();
    return products
  }
}