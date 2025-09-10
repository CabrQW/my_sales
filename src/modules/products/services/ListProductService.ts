import { Product } from "@modules/products/database/entities/Product";
import { productsRepositoreis } from "@modules/products/repositories/ProductsRepositories"

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await productsRepositoreis.find();
    return products
  }
}
