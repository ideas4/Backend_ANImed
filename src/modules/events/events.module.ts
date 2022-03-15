import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { AttachedEventModule } from './attached-event/attached-event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AttachedEventModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
