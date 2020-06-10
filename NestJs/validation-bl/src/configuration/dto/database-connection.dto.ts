import { DatabaseType } from "typeorm";

export class DatabaseConnectionDto {
    type : any ; // as DatabaseType 
    host :string ;
    port : number ;
    username : string ;
    password : string ;
    database :string ;
    name : string ;
    entities :string[] = [__dirname + '/../**/*.entity.{js,ts}'] ;
    synchronize : boolean ;
} 