import { Domain } from "../domain/domain.model";

export interface AccesToken {
  userId: number;
  username: string;
  role: string;
  domains :Domain[];
  idToken: string;
}
