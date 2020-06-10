import { Domain } from "../domain/domain.model";

export interface JwtPayload {
  id: number ;
  username: string;
  role?: string;
  domains? :Domain[]
}
