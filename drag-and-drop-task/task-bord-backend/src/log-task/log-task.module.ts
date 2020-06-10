import { Module } from '@nestjs/common';
import { LogTaskController } from './log-task.controller';
import { LogTaskService } from './log-task.service';

@Module({
  controllers: [LogTaskController],
  providers: [LogTaskService]
})
export class LogTaskModule {}
