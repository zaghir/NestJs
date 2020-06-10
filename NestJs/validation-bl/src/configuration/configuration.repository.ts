import { Injectable, ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectConnection, InjectEntityManager } from "@nestjs/typeorm";
import { dbConnection } from "../config/datasource.config";
import { EntityManager, Connection } from "typeorm";
import { ConfigurationApp } from "./configuration.model";
import { queries } from "../config/queries";
import { Domain } from "../domain/domain.model";
import { Application } from "../application/application.model";
import { DatabaseConnectionDto } from "./dto/database-connection.dto";

@Injectable()
export class ConfigurationRespository {

    constructor(
        @InjectConnection(dbConnection.connexion1.name)
        private connection1: Connection,
        @InjectEntityManager(dbConnection.connexion1.name)
        private entityManager1: EntityManager,
      ) {}

      private logger = new Logger('ConfigurationRespository');

      async findOne(key: string): Promise<ConfigurationApp> {
        try {
          this.logger.log("----findOne----" , key);
          
          const result = await this.connection1.query(queries.configurationFindOne ,[key]) ;
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

      mapperConfig(rs:any) :ConfigurationApp {
        const c :ConfigurationApp = new ConfigurationApp();
              c.id = rs.conf_id ? rs.conf_id : null ;
              c.name = rs.conf_name ? rs.conf_name : null ;
              c.value = rs.conf_value ? rs.conf_value : null ;
              c.description = rs.conf_description ? rs.conf_description : null ;

              const domain :Domain = new Domain() ;
              domain.id = rs.domain_id ? rs.domain_id : null ;
              domain.name = rs.domain_name ? rs.domain_name : null ;
              c.domain = domain ;

              const app: Application = new Application() ;
              app.id = rs.app_id ? rs.app_id : null  ;
              app.name = rs.app_name ? rs.app_name : null ;
              c.application = app ;
              return c;
      }
      async findAll(): Promise<ConfigurationApp[]> {
        try {
          this.logger.log("----findAll------------------");
          
          const result = await this.connection1.query(queries.configurationFindAll ) ;
          let res :ConfigurationApp[] ;

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
              console.log("ConfigurationRespository :findAll ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }

      async findByIdApp(id : number): Promise<ConfigurationApp[]> {
        try {
          this.logger.log("----findAll------------------");
          
          const result = await this.connection1.query(queries.configurationFindByIdApp  ,[id]) ;
          let res :ConfigurationApp[] ;

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
              console.log("ConfigurationRespository :findAll ", error) ;
            throw new InternalServerErrorException(error);
          }
        }
      }

      async configurationFindByAppidUserId( appId : number ,userId : number  ): Promise<ConfigurationApp[]> {
        try {
          this.logger.log("----findAll------------------");
          
          const result = await this.connection1.query(queries.configurationFindByAppidUserId  ,[appId , userId]) ;
          let res :ConfigurationApp[] ;

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
              console.log("ConfigurationRespository :findAll ", error) ;
            throw new InternalServerErrorException();
          }
        }
      }
 
      async update(config: ConfigurationApp): Promise<ConfigurationApp> {
        try {
          console.log("---ConfigurationRepository--update------------------" ,config);
          await this.connection1.query(queries.configurationUpdate ,
            [
              config.id ,
              config.name , 
              config.value , 
              config.description ,
              config.domain.id ,
              config.application.id ,
            ]) ;
          
          return config;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }

      async add(config: ConfigurationApp): Promise<ConfigurationApp> {
        try {
          console.log("---ConfigurationRepository--add------------------" ,config);
          
          await this.connection1.query(queries.configurationInsert ,
            [
              config.id ,
              config.name , 
              config.value , 
              config.description ,
              config.domain.id ,
              config.application.id ,
            ]) ;
          
          return config;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }

      async getConfisDatatabase():Promise<DatabaseConnectionDto[]>{

        console.log("queries.configurationFindConnectionDb" , queries.configurationFindConnectionDb) ;
        const result = await this.connection1.query(queries.configurationFindConnectionDb) ;
        let conns : DatabaseConnectionDto[] ; 
        try{
          if(result && result.length > 0) {
            conns = result.map((rs :any) => {  
              try{
                return JSON.parse(rs.value) ;

              }catch(error){
                return null ;
              }              
            });
          }          
          return conns;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(error);
        }
      }
      
}