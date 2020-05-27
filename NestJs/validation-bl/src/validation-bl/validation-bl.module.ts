import { Module } from '@nestjs/common';
import { ValidationBlController } from './validation-bl.controller';
import { ValidationBlService } from './validation-bl.service';
import { ValidationBlRepository } from './validation-bl.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ValidationBlController],
  providers: [ValidationBlService, ValidationBlRepository],
})
export class ValidationBlModule {}
