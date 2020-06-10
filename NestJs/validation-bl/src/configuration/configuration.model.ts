import { Domain } from '../domain/domain.model';
import { Application } from '../application/application.model';
export class ConfigurationApp{

    id: string ;
    name : string ;
    value: string ; 
    description: string ;
    domain : Domain;
    application : Application

}