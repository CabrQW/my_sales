import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Product } from "@modules/products/infra/database/entities/Product";
import { In } from "typeorm";

interface IFindProducts {
  id: string
}

export const productsRepositoreis = AppDataSource.getRepository(Product).extend({
  async findByName( name: string) : Promise<Product | null> {
    return this.findOneBy({name})
  },

  async findById( id: string) : Promise<Product | null> {
      return this.findOneBy({id})
    },

  async findAllByIds(product: IFindProducts[]): Promise<Product[]> {
    const productsIds =  product.map(product => product.id)

    const existentProducts = await this.find({
      where: { id: In(productsIds)},
    })

    return existentProducts
  }
});
