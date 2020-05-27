import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const conn1: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'taskmanagement',
  name: 'connexion1',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};

const conn2: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'taskmanagement',
  name: 'connexion2',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};

export const dbConnection = {
  connexion1: conn1,
  connexion2: conn2,
};
