import { Injectable } from '@nestjs/common';

import { DomainRepository } from './domain.respository';
import { Domain } from './domain.model';

@Injectable()
export class DomainService {

    constructor(private domainRespository : DomainRepository){}

    async getAllDomain() : Promise<Domain[]>{
        return this.domainRespository.findAll()
    }

    getById(id : number) : Promise<Domain>{
        return this.domainRespository.findOne(id);
    }

    update(domain : Domain) : Promise<Domain>{
        return this.domainRespository.update(domain);
    }

    add(domain : Domain) : Promise<Domain>{
        return this.domainRespository.add(domain);
    }


}
