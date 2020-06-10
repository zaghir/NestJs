import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user';
import { AccesToken } from './accesToken.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<void> {
    return this.userRepository.signUp(userDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<AccesToken> {

    const user: User = await this.userRepository.validateUserPassword( authCredentialDto);

    if (!user) {
      throw new UnauthorizedException('invalid Credentials');
    }

    const { id , username, role , domains } = user;
    const payload: JwtPayload = { id , username, role , domains }; // on peut ajouter d'autre infors comme le role le mail ...
    const idToken = await this.jwtService.sign(payload);

    return { userId : id , username , role , idToken , domains };
  }
}
