import { Module } from '@nestjs/common';
import { ValidationBlController } from './validation-bl.controller';
import { ValidationBlService } from './validation-bl.service';
import { ValidationBlRepository } from './validation-bl.repository';
import { AuthModule } from '../auth/auth.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [AuthModule ,ConfigurationModule],
  controllers: [ValidationBlController],
  providers: [ValidationBlService, ValidationBlRepository  ],
})
export class ValidationBlModule {}
