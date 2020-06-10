import * as bcrypt from 'bcrypt';
import { Domain } from '../domain/domain.model';

export class User {
  id: number;

  username: string;

  password: string;

  surname : string; 
  
  lastname :string ;

  email : string ;

  salt: string;

  role: string;

  domains : Domain[] ;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
