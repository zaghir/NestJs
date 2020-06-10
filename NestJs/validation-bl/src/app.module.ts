import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationBlModule } from './validation-bl/validation-bl.module';
import { AuthModule } from './auth/auth.module';
import { dbConnection } from './config/datasource.config';
import { ConfigurationModule } from './configuration/configuration.module';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ValidationBlModule,
    AuthModule,
    TypeOrmModule.forRoot(dbConnection.connexion1),
    TypeOrmModule.forRoot(dbConnection.connexion2),
    ConfigurationModule,
    DomainModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
