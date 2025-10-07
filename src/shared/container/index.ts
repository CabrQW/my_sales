import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositories';
import CustomersRepository from '@modules/customers/infra/database/repositories/ICustomersRepositories';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/database/repositories/OrderRepositories';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/database/repositories/IProductsRepository';
import { IUsersRepository } from '@modules/Users/domain/repositories/IUserRepositories';
import { IUserTokensRepository } from '@modules/Users/domain/repositories/IUserTokensRepository';
import UsersRepository from '@modules/Users/infra/database/repositories/UsersRepository';
import UserTokensRepository from '@modules/Users/infra/database/repositories/UserTokensRepository';



container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
