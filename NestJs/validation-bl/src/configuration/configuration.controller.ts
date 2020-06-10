import { Controller, Get, Param, Query, Patch, Put, Body, UseGuards, Logger } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationApp } from './configuration.model';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user';
import { DatabaseConfigurationService } from './datatbase-configuration.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('configuration')
@UseGuards(AuthGuard())
export class ConfigurationController {

    constructor(
        private configService : ConfigurationService , 
        private databaseConfigs :DatabaseConfigurationService){}

    private logger = new Logger('ConfigurationController');


    @Get()
    async getAll(@GetUser() user: User): Promise<ConfigurationApp[]>{

        console.log("configurations getAll user " , user) ;
        await this.databaseConfigs.getDatabaseConnections() ;
        console.log("configurations getAll user " , );
        return this.configService.getAll();
    }

    @Get("q")
    async getByKey(
        @Query() query , 
        @GetUser() user: User): Promise<ConfigurationApp[]>{
            console.log("configurations getByKey user " , user) ;
            if(query.id){
                return [ await this.configService.getBykey(query.id) ];
            }
            // else if(query.idApp){
            //     return this.configService.findByIdApp(query.idApp);
            // }
            else if(query.idApp && user.id){
                return this.configService.configurationFindByAppidUserId(query.idApp , user.id);
            }
            return null ;        
    }


    @Patch()
    async update(
        @Body() config,
        @GetUser() user: User){
            console.log("ConfigurationController : update " , config);
            return this.configService.update(config);
    }

    @Put()
    async add(
        @Body() config,
        @GetUser() user: User){
            console.log("ConfigurationController : add " , config);
            return this.configService.add(config);
    }

}
