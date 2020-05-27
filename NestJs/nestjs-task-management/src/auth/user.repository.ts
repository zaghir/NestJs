import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentielDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentielDto;

    const salt = await bcrypt.genSalt();

    const user = new User();

    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    console.log(user.password);
    try {
      await user.save();
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
  ): Promise<string> {
    console.log('validateUserPassword ---> ');
    const { username, password } = authCredentielDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
