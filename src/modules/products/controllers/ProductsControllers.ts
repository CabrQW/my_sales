import CreateProductService from "@modules/services/CreateProductService";
import DeleteProductService from "@modules/services/DeleteProductService";
import ListProductService from "@modules/services/ListProductService";
import ShowProductService from "@modules/services/ShowProductService";
import UpdateProductService from "@modules/services/UpdateProductService";
import { Request, Response } from "express";

export default class ProductsControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService();
    const products = await listProductsService.execute();
    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });
    return response.json(product);
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, price, quantity} = request.body
    const createProductService = new CreateProductService()
    const product = await createProductService.excute({ name, price, quantity})
    return response.json(product)
  }

  async udpate (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const {  name, price, quantity} = request.body
    const udpateProductService = new UpdateProductService()
    const product = await udpateProductService.excute({
      id, name, price, quantity
    })

    return response.json(product)
  }

  public async delete(request: Request, response:Response): Promise<Response> {
    const { id } = request.params
    const deleteProductService = new DeleteProductService()
    await deleteProductService.execute({ id })
    return response.status(204).send([])
  }

}