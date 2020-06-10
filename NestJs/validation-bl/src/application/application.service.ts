import { Injectable } from '@nestjs/common';
import { ApplicationRespository } from './application.repository';
import { Application } from './application.model';

@Injectable()
export class ApplicationService {

    constructor( private applicationRepository : ApplicationRespository){}

    async getAll() : Promise<Application[]>{
        return this.applicationRepository.findAll();
    }

    async getBykey(id : number) : Promise<Application>{
        return this.applicationRepository.findOne(id) ;
    } 

    async add(app : Application) : Promise<Application>{
        return this.applicationRepository.add(app) ;
    }

    async update(app : Application) : Promise<Application>{
        return this.applicationRepository.update(app) ;
    }

}
