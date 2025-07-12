// src/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cliente } from './clientes/cliente.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'KevDeb93',
  database: 'clientesdb',
  entities: [Cliente],
  synchronize: true, // ⚠️ solo para desarrollo
};
