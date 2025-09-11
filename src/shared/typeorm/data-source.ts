import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Product } from '@modules/products/database/entities/Product'
import { User } from "@modules/Users/database/entities/User";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product, User],
  migrations: [`./src/shared/typeorm/migrations/*.{ts,js}`],
});
