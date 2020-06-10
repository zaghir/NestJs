import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';

import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { InjectConnection, InjectEntityManager } from '@nestjs/typeorm';
import { dbConnection } from 'src/config/datasource.config';
import { Connection, EntityManager } from 'typeorm';
import { User } from './user';
import { queries } from '../config/queries';
import { UserDto } from './dto/user.dto';
import { DomainService } from 'src/domain/domain.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectConnection(dbConnection.connexion1.name)
    private connection1: Connection,
    @InjectEntityManager(dbConnection.connexion1.name)
    private entityManager1: EntityManager,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {

    const { username, password, role , surname , lastname , email , domains} = userDto;

    const salt = await bcrypt.genSalt();

    const user = new User();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.role = role;
    user.salt = salt;
    user.surname = surname ;
    user.lastname = lastname ;
    user.email = email ;
    user.domains = domains ;
    console.log("signUp  user ===> ",user);
    try {
      const ids = await this.connection1.query(
        queries.userSingup ,
        [
          user.username,
          user.surname,
          user.lastname,
          user.email,
          user.password, 
          user.salt, 
          +user.role],
      )

      if(user.domains && user.domains.length > 0) {
        user.domains.forEach( async domain => {          
          try{
            await this.connection1.query(queries.userAddDomain , [ ids[0].id , domain.id]);
          }catch(error){
            console.log("error " , error);
            throw new InternalServerErrorException(error);
          }
        } );          
      }
      console.log("result-----------------------------" ,ids) ;      
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        // duplicat username
        throw new ConflictException('username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentielDto: AuthCredentialDto,
  ): Promise<User> {
    const { username, password } = authCredentielDto;

    const user = await this.findOne(username);
    if (user) {
      console.log("----validateUserPassword------------------");
      const usr: User = new User();
      usr.id = user.id;
      usr.username = user.username;
      usr.password = user.password;
      usr.salt = user.salt;
      usr.role = user.role ? user.role : null;
      usr.domains = user.domains ? user.domains : null ;
      if (await usr.validatePassword(password)) {
        delete usr.salt;
        delete usr.password;
        return usr;
      }
    } else {
      
      return null;
    }
  }

  async findOne(username: string): Promise<User> {
    try {
      console.log("----findOne------------------");
      const result = await this.connection1.query(queries.userFindOne ,[username]) ;
      const domains = await this.connection1.query(queries.userFindDomain ,[result[0].id]) ;
      result[0].domains = domains ;
      return result[0];
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicat username
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
