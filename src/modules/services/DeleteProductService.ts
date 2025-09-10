import { productsRepositoreis } from "@modules/repositories/ProductsRepositories"
import AppError from "@shared/errors/AppError"

interface IDeleteProduct {
  id: string
}


export default class DeleteProductService {
  async execute({id}: IDeleteProduct): Promise<void>{
    const product = await productsRepositoreis.findById(id)

    if (!product) {
      throw new AppError("Delete not found", 404)
    }

    await productsRepositoreis.remove(product)
  }
}