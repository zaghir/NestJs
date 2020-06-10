import { DomainDto } from '../../domain/dto/domain.dto';
import { ApplicationDto } from '../../application/dto/application.dto';

export class ConfigDto {
  id: string ;
  name : string ;
  value: string ;
  description: string ;
  domain : DomainDto;
  application : ApplicationDto;

}
