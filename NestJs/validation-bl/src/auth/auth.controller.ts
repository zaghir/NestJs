import { Controller, ValidationPipe, Post, Body } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AccesToken } from './accesToken.interface';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<void> {
    return this.authService.signUp(userDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<AccesToken> {
      console.log("signin ==>" , authCredentialDto)
    const jeton = await this.authService.signIn(authCredentialDto);
    console.log('jeton', jeton);
    return jeton;
  }
}
