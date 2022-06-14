import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurage } from './entities/insurage.entity';
import { InsuragesController } from './insurages.controller';
import { InsuragesService } from './insurages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Insurage])],
  controllers: [InsuragesController],
  providers: [InsuragesService],
})
export class InsuragesModule {}
