import { Injectable } from '@nestjs/common';
import { ConfigurationRespository } from './configuration.repository';
import { DatabaseConnectionDto } from './dto/database-connection.dto';
import { createConnection , Connection , ConnectionOptions, getConnection, createConnections} from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class DatabaseConfigurationService {

    connections :Connection[] ;
    
    constructor( private configRepository : ConfigurationRespository){ console.log(" constructor  --- DatabaseConfigurationService"); }


    async getDatabaseConnections() :Promise<Connection[]>{
        console.log("getDatabaseConnections  -------------------------------" );
        if(this.connections && this.connections.length > 0){
            console.log("getDatabaseConnections  is loaded");
            return this.connections ;
        }else {
            console.log("getDatabaseConnections  is not yet loaded");
            const rs  =  await this.configRepository.getConfisDatatabase();
            console.log("getDatabaseConnections  is not yet loaded");            
            // on n'ajoute pas des connection qui existe deja 
            const options = rs
                .filter((con :DatabaseConnectionDto) =>{ 
                    try {
                        if(con!= null && !getConnection(con.name)){
                            return true ;   
                           }else{
                               false;
                           }
                    } catch (error) {
                        // connection non trouvé on la  cree  nouvelle                        
                        return true ;   
                    }
                })
                .map( ( con : DatabaseConnectionDto) => {                
                    const  c :ConnectionOptions = {
                        type: "mssql",
                        host: con.host,
                        port: con.port,
                        username: con.username,
                        password: con.password,
                        database: con.database,
                        name: con.name,  
                        entities: [__dirname + con.entities],
                        synchronize: con.synchronize
                    }
                return c ;
            });
            this.connections = await createConnections(options);

            return this.connections ;
        }

        
    }   

    async getDatabaseConnectionbyName(name :string) : Promise<Connection> {
        
        if(this.connections  && this.connections.length > 0){
            // getConnectionManager().get("default")

            return this.connections.find(con => con.name == name) ;

            // result = this.connections.get.filter( (conn :Connection) => conn.name == name  ) ;
        }else{
            
            await this.getDatabaseConnections();            
            const conn = await this.connections.find(  (con :Connection) => {
                 if(con.name === name){
                     return true ;
                 }else{
                     return false ;
                 }
                });
            console.log("conns ------> ",conn);
            return  conn;
        }
        
        return null ;
    }



    

}
