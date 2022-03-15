import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttachedEventDto } from './dto/create-attached-event.dto';
import { UpdateAttachedEventDto } from './dto/update-attached-evetn.dto';
import { AttachedEvent } from './entities/attached-event.entity';

@Injectable()
export class AttachedEventService {
  constructor(
    @InjectRepository(AttachedEvent)
    private repository: Repository<AttachedEvent>,
  ) {}

  async create(createAttachedEvent: CreateAttachedEventDto) {
    return this.repository.save(createAttachedEvent);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  findForEvent(id: number) {
    const query = `select evento_adjunto.id, evento_adjunto.ruta, evento_adjunto.idEvento from evento_adjunto
    where evento_adjunto.idEvento = ${id};`;
    return this.repository.query(query);
  }

  async update(id: number, updateAttachedEvent: UpdateAttachedEventDto) {
    return (await this.repository.update(id, updateAttachedEvent)).affected;
  }

  async remove(id: number) {
    return (await this.repository.delete(id)).affected;
  }
}
