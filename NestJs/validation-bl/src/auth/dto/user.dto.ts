import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNumber,
  IsEmail,
} from 'class-validator';
import { UserRole } from '../user-roles.enum';
import { Domain } from '../../domain/domain.model';

export class UserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNumber()
  @IsOptional()
  role?: UserRole;
  
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  surname : string; 
  
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  lastname :string ;

  @IsEmail()
  @IsOptional()
  email? : string ;

  @IsOptional()
  domains :Domain[] ;

}
