import { Injectable } from '@nestjs/common';
import { ConfigurationRespository } from './configuration.repository';
import { ConfigurationApp } from './configuration.model';

@Injectable()
export class ConfigurationService {

    constructor( private configRepository : ConfigurationRespository){}

    async getAll() : Promise<ConfigurationApp[]>{
        return this.configRepository.findAll();
    }

    async findByIdApp(id : number): Promise<ConfigurationApp[]> {
        return  this.configRepository.findByIdApp(id );
    }

    async getBykey(id : string) : Promise<ConfigurationApp>{
        return this.configRepository.findOne(id) ;
    }
    
    async configurationFindByAppidUserId( appId : number ,userId : number  ): Promise<ConfigurationApp[]> {
        return this.configRepository.configurationFindByAppidUserId(appId , userId) ;
    }

    async add(config : ConfigurationApp) : Promise<ConfigurationApp>{
        return this.configRepository.add(config) ;
    }

    async update(config : ConfigurationApp) : Promise<ConfigurationApp>{
        return this.configRepository.update(config) ;
    }

}
