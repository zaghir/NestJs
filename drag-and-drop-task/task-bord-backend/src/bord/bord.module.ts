import { Module } from '@nestjs/common';
import { BordController } from './bord.controller';
import { BordService } from './bord.service';

@Module({
  controllers: [BordController],
  providers: [BordService]
})
export class BordModule {}
