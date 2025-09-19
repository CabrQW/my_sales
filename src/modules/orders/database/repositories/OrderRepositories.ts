import { AppDataSource } from "@shared/typeorm/data-source";
import { Order } from "../entities/Order";
import { Customer } from "@modules/customers/database/entities/Customer";
// import { OrdersProducts } from "../entities/OrdersProducts";

interface ICreateOrder {
  customer: Customer,
  product: ICreateOrderProducts[]
}

export interface ICreateOrderProducts {
  product_id: string,
  price: number,
  quantity:number
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findByid( id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customer']
    })

    return order
  },

  async createOrder({customer, product}: ICreateOrder): Promise<Order>{
    const order = this.create({
      customer,
      order_products: product,
    })
    await this.save(order)
    return order
  },
})