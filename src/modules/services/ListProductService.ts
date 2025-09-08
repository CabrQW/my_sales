import { Product } from "@modules/database/entities/Product";
import { productsRepositoreis } from "@modules/repositories/ProductsRepositories"

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await productsRepositoreis.find();
    return products
  }
}