import { Module } from '@nestjs/common';
import { ControlfelLimiteService } from './controlfel-limite.service';
import { ControlfelLimiteController } from './controlfel-limite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlFelLimite } from './entities/controlfel-limite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlFelLimite])],
  providers: [ControlfelLimiteService],
  controllers: [ControlfelLimiteController],
})
export class ControlfelLimiteModule {}
