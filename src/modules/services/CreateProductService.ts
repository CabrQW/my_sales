import { Product } from "@modules/database/entities/Product";
import { productsRepositoreis } from "@modules/repositories/ProductsRepositories"
import AppError from "@shared/errors/AppError";


interface ICreateProduct{
  name: string,
  price: number,
  quantity: number
}

export default class CreateProductService{
  async excute({name,price,quantity}: ICreateProduct): Promise<Product>{
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

    return product
  }
}