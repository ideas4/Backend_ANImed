import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachedEventController } from './attached-event.controller';
import { AttachedEventService } from './attached-event.service';
import { AttachedEvent } from './entities/attached-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttachedEvent]), AttachedEventModule],
  controllers: [AttachedEventController],
  providers: [AttachedEventService],
})
export class AttachedEventModule {}
