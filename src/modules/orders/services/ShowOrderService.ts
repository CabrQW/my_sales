import AppError from "@shared/errors/AppError";
import { Order } from "../infra/database/entities/Order";
import { orderRepositories } from "../database/repositories/OrderRepositories";
import RedisCache from "@shared/cache/RedisCache";

export class ShowOrderService{
  async execute(id: string): Promise<Order> {
    const order = await orderRepositories.findByid(Number(id))
    const redisCache = new RedisCache()

    if(!order) {
      throw new AppError('Order not found.')
    }

    await redisCache.invalidate('api-mysales-PRODUCT_LIST')
    return order
  }
}
