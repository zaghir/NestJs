import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InjectConnection, InjectEntityManager } from "@nestjs/typeorm";
import { dbConnection } from "src/config/datasource.config";
import { EntityManager, Connection } from "typeorm";
import { queries } from "src/config/queries";
import { Application } from "./application.model";

@Injectable()
export class ApplicationRespository {

    constructor(
        @InjectConnection(dbConnection.connexion1.name)
        private connection1: Connection,
        @InjectEntityManager(dbConnection.connexion1.name)
        private entityManager1: EntityManager,
      ) {}

      async findOne(id: number): Promise<Application> {
        try {
          console.log("----findOne------------------");
          
          const result = await this.connection1.query(queries.applicationFindOne ,[id]) ;
          if(result && result.length > 0 ){
            return this.mapperConfig(result[0]) ;
          }
          return null ;
        } catch (error) {
          console.log(error);
          if (error.code === '23505') {
            // duplicat username
            throw new ConflictException('username already exists');
          } else {
              console.log("ConfigurationRespository :findOne ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }

      mapperConfig( app :any) :Application {
        const c :Application = new Application();
              c.id = app.id ;
              c.name = app.name ;
              c.description = app.description ;
              return c;
      }
      async findAll(): Promise<Application[]> {
        try {
          console.log("----findAll------------------");
          
          const result = await this.connection1.query(queries.applicationFindAll ) ;
          let res :Application[] ;

          if(result &&  result.length > 0){

            res = result.map( (config : any) => {              
              return this.mapperConfig(config);
            });
          }
          return res;
        } catch (error) {
          console.log(error);
          if (error.code === '23505') {
            // duplicat username
            throw new ConflictException('username already exists');
          } else {
              console.log("ApplicationRespository :findAll ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }
 
      async update(app: Application): Promise<Application> {
        try {
          console.log("---ApplicationRepository--update------------------" ,app);
          
          await this.connection1.query(queries.applicationUpdate ,[app.id , app.name , app.description ]) ;
          
          return app;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }

      async add(app: Application): Promise<Application> {
        try {
          console.log("---ApplicationRepository--add------------------" ,app);
          
          await this.connection1.query(queries.applicationInsert ,[app.id , app.name , app.description ]) ;
          
          return app;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }
      
}