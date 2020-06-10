import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { DomainRepository } from './domain.respository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DomainController],
  providers: [DomainService , DomainRepository]
})
export class DomainModule {}
