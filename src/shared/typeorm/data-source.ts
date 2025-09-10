import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { Product } from '@modules/products/database/entities/Product'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product],
  migrations: [`./src/shared/typeorm/migrations/*.{ts,js}`],
});
