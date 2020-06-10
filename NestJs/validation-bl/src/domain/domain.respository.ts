import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InjectConnection, InjectEntityManager } from "@nestjs/typeorm";
import { Connection, EntityManager } from "typeorm";
import { dbConnection } from "src/config/datasource.config";
import { queries } from "src/config/queries";
import { Domain } from "./domain.model";

@Injectable()
export class DomainRepository {

    constructor(
        @InjectConnection(dbConnection.connexion1.name)
        private connection1: Connection,
        @InjectEntityManager(dbConnection.connexion1.name)
        private entityManager1: EntityManager,
    ){}

    async findOne(id: number): Promise<Domain> {
        try {
          console.log("---DomainRepository--findOne------------------" ,id);
          
          const result = await this.connection1.query(queries.domainFindOne ,[id]) ;
          return result[0];
        } catch (error) {
          console.log(error);
          if (error.code === '23505') {
            // duplicat username
            throw new ConflictException('username already exists');
          } else {
              console.log("DomainRespository :findOne ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }

      async findAll(): Promise<Domain[]> {
        try {
          console.log("----findAll------------------");
          
          const result = await this.connection1.query(queries.domainFindAll ) ;
          return result;
        } catch (error) {
          console.log(error);
          if (error.code === '23505') {
            // duplicat username
            throw new ConflictException('username already exists');
          } else {
              console.log("DomainRespository :findOne ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }

      async update(domain: Domain): Promise<Domain> {
        try {
          console.log("---DomainRepository--update------------------" ,domain);
          
          await this.connection1.query(queries.domainUpdate ,[+domain.id , domain.name , domain.description]) ;
          
          return domain;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }

      async add(domain: Domain): Promise<Domain> {
        try {
          console.log("---DomainRepository--add------------------" ,domain);
          
          await this.connection1.query(queries.domainInsert ,[+domain.id , domain.name , domain.description]) ;
          
          return domain;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }
   
}