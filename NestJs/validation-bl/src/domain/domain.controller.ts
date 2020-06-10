import { Controller, Get, Param, Query, Post, Body, Patch, Put, UseGuards, Logger } from '@nestjs/common';
import { DomainService } from './domain.service';


import { User } from '../auth/user';
import { Domain } from './domain.model';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('domain')
//@UseGuards(AuthGuard())
export class DomainController {

    constructor(private domainService :DomainService){}

    private logger = new Logger('DomainController');

    @Get()
    async getAllDomain(
        @GetUser() user: User ,
        @Query() que) : Promise<Domain[]>{
        console.log("que" , que);
        return this.domainService.getAllDomain();
    }

    @UseGuards(AuthGuard())
    @Get("q")
    async getBy(
        @Query() que,
        @GetUser() user: User){
            console.log("DomainController : getById " , que.id);
        return this.domainService.getById(+que.id);
    }

    @UseGuards(AuthGuard())
    @Patch()
    async update(
        @Body() domain,
        @GetUser() user: User){
            console.log("DomainController : update " , domain);
            return this.domainService.update(domain);
    }

    @UseGuards(AuthGuard())
    @Put()
    async add(
        @Body() domain,
        @GetUser() user: User){
            console.log("DomainController : add " , domain);
            return this.domainService.add(domain);
    }

}
