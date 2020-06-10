import { Module } from '@nestjs/common';
import { ColController } from './col.controller';
import { ColService } from './col.service';

@Module({
  controllers: [ColController],
  providers: [ColService]
})
export class ColModule {}
