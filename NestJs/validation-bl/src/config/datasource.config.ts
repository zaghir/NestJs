import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const conn1: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'admin',
//   database: 'taskmanagement',
//   name: 'connexion1',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: false,
// };

// const conn2: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'admin',
//   database: 'taskmanagement',
//   name: 'connexion2',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: false,
// };

//Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;
const conn1: TypeOrmModuleOptions = {
  type: 'mssql',
  host:  process.env.DB_HOST || '192.168.0.11',
  port: 1433, // Used to be process.env.DB_PORT
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || 'sa',
  database: process.env.DB_NAME || 'bl-validation',
  name: 'connexion1',  
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};

const conn2: TypeOrmModuleOptions = {
  type: 'mssql',
  host:  process.env.DB_HOST || '192.168.0.11',
  port: 1433, // Used to be process.env.DB_PORT
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || 'sa',
  database: process.env.DB_NAME || 'bl-validation-pattys',
  name: 'connexion2',  
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};

export const dbConnection = {
  connexion1: conn1,
  connexion2: conn2,
};
