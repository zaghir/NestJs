import { Controller, Get, Query, Patch, Put, Body, UseGuards, Logger } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.model';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
@UseGuards(AuthGuard())
export class ApplicationController {

    constructor(private applicationService :ApplicationService){}

    private logger = new Logger('ApplicationController');


    @Get()
    async getAll(@GetUser() user: User): Promise<Application[]>{

        console.log("appurations getAll user " , user) ;
        return this.applicationService.getAll();
    }

    @Get("q")
    async getByKey(
        @Query() query , 
        @GetUser() user: User): Promise<Application>{
        console.log("appurations getByKey user " , user) ;

        return this.applicationService.getBykey(query.id);
    }


    @Patch()
    async update(
        @Body() app,
        @GetUser() user: User){
            console.log("ApplicationController : update " , app);
            return this.applicationService.update(app);
    }

    @Put()
    async add(
        @Body() app,
        @GetUser() user: User){
            console.log("ApplicationController : add " , app);
            return this.applicationService.add(app);
    }

}
