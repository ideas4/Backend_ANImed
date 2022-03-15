import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../config-admin/entities/config.entity';
import { ConfigEcommerce } from '../config-ecommerce/entities/config-ecommerce.entity';
import { ConfigMedController } from './config-med.controller';
import { ConfigMedService } from './config-med.service';
import { ConfigMed } from './entities/config-med.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Config, ConfigMed, ConfigEcommerce])],
  controllers: [ConfigMedController],
  providers: [ConfigMedService],
})
export class ConfigMedModule {}
