import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post("/login")
    login(){
        return "Login ok " ;

    }


    @Post("/logout")
    logout(){
        return "logout ok " ;

    }

    @Post("/signup")
    signup(){
        return "signup ok " ;
    }

}
