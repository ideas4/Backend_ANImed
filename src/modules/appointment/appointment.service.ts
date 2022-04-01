import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { SendMailService } from 'src/services/mailer/send-mail.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repositoryAppointment: Repository<Appointment>,
    private emailService: SendMailService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    return await this.repositoryAppointment.save(createAppointmentDto);
  }

  findAll() {
    return this.repositoryAppointment.find();
  }

  findOne(id: number) {
    return this.repositoryAppointment.findOne(id);
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return (await this.repositoryAppointment.update(id, updateAppointmentDto))
      .affected;
  }

  async remove(id: number) {
    return (await this.repositoryAppointment.delete(id)).affected;
  }

  async findAllWithColor() {
    const query = `Select cita.id, cita.title, cita.description, cita.start, cita.end, cita.idCliente, cita.idTipoCita, tc.codigo_color as color, c.nombre_completo as nombre from cita
    inner join tipo_cita tc on cita.idTipoCita = tc.idTipoCita
    inner join cliente c on cita.idCliente = c.id;`;
    return await this.repositoryAppointment.query(query);
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // // CronExpression.EVERY_DAY_AT_6AM
  // // CronExpression.EVERY_DAY_AT_1PM

  //CRON SINTAX TODOS LOS DIAS , A LAS 8 AM
  @Cron('0 0 8 * * *', {
    timeZone: 'America/Guatemala',
  })
  async timeFunction() {
    let query = `SELECT cl.nombre_completo, cl.email, cita.start FROM cita
                  inner join cliente cl on cl.id = cita.idCliente
                  WHERE DATE(cita.start)=DATE(NOW()+ INTERVAL 1 DAY) ;`;

    let result = await this.repositoryAppointment.query(query);

    result.forEach((element) => {
      let hours = new Date(element.start).toLocaleTimeString('es-GT', {
        timeZone: 'America/Guatemala',
      });

      let date = new Date(element.start).toLocaleDateString('es-GT', {
        timeZone: 'America/Guatemala',
      });

      this.emailService.sendNotificationAppointment(
        element.nombre_completo,
        element.email,
        date,
        hours,
      );
    });

    // this.emailService.sendNotificationAppointment(
    //   'Kevin Josue',
    //   'kcalderon744@gmail.com',
    //   '2022-03-08 10:30:00',
    // );
  }
}
