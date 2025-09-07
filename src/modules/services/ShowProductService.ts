import { Product } from "@modules/database/entities/Product";
import { productsRepositoreis } from "@modules/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  async execute({id}: IShowProduct): Promise<Product>{
    const products = await productsRepositoreis.findByName(id)
    if (!products) {
      throw new AppError ("Product not found.", 404)
    }

    return products
  }
}