import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { BordModule } from './bord/bord.module';
import { ColModule } from './col/col.module';
import { PersonModule } from './person/person.module';
import { RoleModule } from './role/role.module';
import { LogTaskModule } from './log-task/log-task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TaskModule, BordModule, ColModule, PersonModule, RoleModule, LogTaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
