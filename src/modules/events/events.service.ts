import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repository: Repository<Event>) {}

  async create(createEventDto: CreateEventDto) {
    createEventDto['fecha_creacion'] = new Date();
    return this.repository.save(createEventDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  findOneOfClient(id: number) {
    const query = `select evento.id, evento.titulo, evento.cuerpo, evento.fecha_creacion, evento.isAdjunto from evento
    inner join cliente c on evento.idCliente = c.id where idCliente = ${id} order by fecha_creacion desc;`;
    return this.repository.query(query);
  }

  findLastRegister(id: number) {
    const query = `select evento.id, evento.fecha_creacion from evento
    inner join cliente c on evento.idCliente = c.id
    where idCliente = ${id}
    order by fecha_creacion desc limit 1;`;
    return this.repository.query(query);
  }

  filterForDate(dateStart: string, dateEnd: string, id: number) {
    const query = `select evento.id, evento.titulo, evento.cuerpo, evento.fecha_creacion, evento.isAdjunto from evento
    inner join cliente c on evento.idCliente = c.id
    WHERE evento.fecha_creacion BETWEEN str_to_date('${dateStart} 00:00:00', '%d-%m-%Y %T') AND str_to_date('${dateEnd} 23:59:00', '%d-%m-%Y %T') and evento.idCliente = ${id};
    `;
    return this.repository.query(query);
  }

  //obtiene el correo electronico del cliente, por medio del id del evento que esta modificando.
  getEmailClientForEvent(id: number) {
    const query = `select c.email from evento
    inner join cliente c on evento.idCliente = c.id
    where evento.id = ${id};`;

    return this.repository.query(query);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return (await this.repository.update(id, updateEventDto)).affected;
  }

  async remove(id: number) {
    return (await this.repository.delete(id)).affected;
  }
}
