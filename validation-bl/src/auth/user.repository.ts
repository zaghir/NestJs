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

@Injectable()
export class UserRepository {
  constructor(
    @InjectConnection(dbConnection.connexion1.name)
    private connection1: Connection,
    @InjectEntityManager(dbConnection.connexion1.name)
    private entityManager1: EntityManager,
  ) {}

  async signUp(authCredentielDto: AuthCredentialDto): Promise<void> {
    const { username, password, role } = authCredentielDto;

    const salt = await bcrypt.genSalt();

    const user = new User();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.role = role;
    user.salt = salt;
    console.log(user.password);
    try {
      await this.connection1.query(
        `insert into public."user" (username , password , salt , role) values ($1 ,$2,$3,$4)`,
        [user.username, user.password, user.salt, user.role],
      );
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        // duplicat username
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentielDto: AuthCredentialDto,
  ): Promise<User> {
    const { username, password } = authCredentielDto;

    const user = await this.findOne(username);

    // console.log('validateUserPassword --->  user findone ', user);

    if (user) {
      const usr: User = new User();
      usr.id = user.id;
      usr.username = user.username;
      usr.password = user.password;
      usr.salt = user.salt;
      usr.role = user.role ? user.role : null;
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
      const result: User = await this.connection1.query(
        `select id, username , password , salt , role  from public."user" where username = $1 `,
        [username],
      );
      return result[0];
    } catch (error) {
      console.log(error.code);
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
