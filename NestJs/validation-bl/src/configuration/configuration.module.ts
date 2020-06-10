import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { ConfigurationRespository } from './configuration.repository';
import { DatabaseConfigurationService } from './datatbase-configuration.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ConfigurationController],
  providers: [ConfigurationService , ConfigurationRespository , DatabaseConfigurationService], 
  exports: [DatabaseConfigurationService ]
})
export class ConfigurationModule {}
