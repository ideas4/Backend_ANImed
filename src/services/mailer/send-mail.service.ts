import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { FreeContactDto } from '../../modules/configurations/config-admin/dto/free-contact.dto';
import { ConfigService } from '../../modules/configurations/config-admin/config.service';
import { QuoteEntity } from '../../modules/quote/entities/quote.entity';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class SendMailService {
  private info: {
    logo: string;
    nombre: string;
    direccion: string;
    correo: string;
    url_host: string;
    url_imagenes: string;
    color: string;
  } = {
    correo: '',
    direccion: '',
    nombre: '',
    logo: '',
    color: '',
    url_host: '',
    url_imagenes: '',
  };
  private orden: { banner: string; mensaje: string } = {
    mensaje: '',
    banner: '',
  };
  private newUser: { banner: string; mensaje: string } = {
    banner: '',
    mensaje: '',
  };
  private notificationEmail = '';

  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  /**
   * Get config from database
   */
  async refreshConfig() {
    const config = await this.configService.findOne();
    const configEcommerce = await this.configService.findEcommerce();
    this.info.logo = config.url_imagenes + 'config/' + configEcommerce.logo;
    this.info.nombre = configEcommerce.nombre;
    this.info.direccion = configEcommerce.direccion;
    this.info.correo = configEcommerce.correo_electronico;
    this.info.color = configEcommerce.primaryColor;
    this.info.url_host = config.url_pagina;
    this.info.url_imagenes = config.url_imagenes;
    this.orden.banner = configEcommerce.banner_orden;
    this.orden.mensaje = configEcommerce.mensaje_orden;
    this.newUser.banner = configEcommerce.banner_bienvenida;
    this.newUser.mensaje = configEcommerce.mensaje_bienvenida;
    this.notificationEmail = config.email_notificaciones;
  }

  /**
   * Correo con información de orden
   * @param order objeto para obtener informacion
   * @param to
   */
  public async sendOrder(order: any, to: string) {
    await this.refreshConfig();
    this.mailerService
      .sendMail({
        to: to,
        subject: 'Orden Ingresada',
        template: 'order',
        context: {
          // Data to be sent to template engine.
          productos: order.productos,
          banner: this.getURLImagen(this.orden.banner),
          cliente: {
            nombre: order.cliente,
            direccion: order.direccion,
            ubicacion: order.envio ? order.envio.nombre : '',
            telefono: order.telefono,
            correo: order.email,
            nit: order.nit_cliente,
          },
          orden: {
            no_guia: order.no_guia,
            no_factura: order.no_factura,
            fecha_entrega: moment(order.fecha_entrega).format('DD-MM-YYYY'),
            fecha_creacion: moment(order.fecha_creacion).format('DD-MM-YYYY'),
            entrega: order.entrega,
            pago: order.m_pago,
            envio: order.envio ? order.envio.costo : 0,
            total: order.total,
            estado: order.estado,
          },
          empresa: {
            direccion: this.info.direccion,
            correo: this.info.correo,
          },
          color: this.info.color,
          message: this.orden.mensaje,
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   *
   * @param to
   * @param nombre_cliente
   * @param key
   */
  public async sendConfirmAccount(
    to: string,
    nombre_cliente: string,
    key: string,
  ) {
    await this.refreshConfig();
    this.mailerService
      .sendMail({
        to: to,
        subject: 'Confirmación de Cuenta',
        template: 'confirm-account',
        context: {
          // Data to be sent to template engine.
          nombre_cliente: nombre_cliente,
          url: this.info.url_host + 'confirm-account.php?key=' + key,
          banner: this.info.url_imagenes + 'config/' + this.newUser.banner,
          color: this.info.color,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
          message: this.newUser.mensaje,
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   *
   * @param nombre_cliente
   * @param to
   * @param usuario
   * @param contrasenia
   */
  public async sendConfirmAccountAdmin(
    nombre_cliente: string,
    to: string,
    usuario: string,
    contrasenia: string,
  ) {
    await this.refreshConfig();
    console.log('enviando....');
    this.mailerService
      .sendMail({
        to: to,
        subject: 'Nuevo Usuario',
        template: 'confirm-account-admin',
        context: {
          // Data to be sent to template engine.
          nombre_usuario: nombre_cliente,
          usuario: usuario,
          contrasenia: contrasenia,
          color: this.info.color,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   *
   * @param to
   * @param nombre_cliente
   * @param key
   */
  public async sendResetPassword(
    to: string,
    nombre_cliente: string,
    key: string,
  ) {
    await this.refreshConfig();
    this.mailerService
      .sendMail({
        to: to,
        subject: 'Restablecer Contraseña',
        template: 'new-password',
        context: {
          // Data to be sent to template engine.
          nombre_cliente: nombre_cliente,
          url: this.info.url_host + 'new-password.php?key=' + key,
          color: this.info.color,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar correo al correo configurado con mensaje de cliente desde el ecommerce
   * @param to
   * @param contact
   */
  public async sendContactMail(contact: FreeContactDto) {
    await this.refreshConfig();
    this.mailerService
      .sendMail({
        to: this.notificationEmail,
        subject: 'Mensaje de Contacto',
        template: 'contact',
        context: {
          contact: contact,
          color: this.info.color,
          empresa: {
            nombre: this.info.nombre,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar correo de cotización
   * @param quote
   * @param pdf_name
   */
  public async sendQuote(quote: QuoteEntity, pdf_name: string) {
    await this.refreshConfig();
    console.log('enviando cotizacion...');
    this.mailerService
      .sendMail({
        to: quote.email,
        subject: 'Cotización',
        template: 'quote-mail',
        context: {
          // Data to be sent to template engine.
          logo: this.info.logo,
          nombre_cliente: quote.cliente,
          mensaje: quote.email_mensaje,
          firma: quote.email_firma,
          color: this.info.color,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
        attachments: [
          {
            filename: 'cotizacion',
            path: 'uploads/docs/' + pdf_name,
            contentType: 'application/pdf',
          },
        ],
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async sendNotificationAppointment(
    nombre_cliente: string,
    to: string,
    fecha: string,
    hora: string,
  ) {
    await this.refreshConfig();
    console.log('enviando....');
    this.mailerService
      .sendMail({
        to: to,
        subject: 'Notificación de Cita',
        template: 'notificacion-appointment.pug',
        context: {
          // Data to be sent to template engine.
          nombre_usuario: nombre_cliente,
          fecha: fecha,
          hora: hora,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async sendTest() {
    // console.log('prueba correo');
    await this.refreshConfig();
    // console.log(await this.refreshConfig());
    this.mailerService
      .sendMail({
        to: 'kcalderon744@gmail.com',
        //from: 'noreply@nestjs.com',
        subject: 'Mensaje de prueba de libreria Cron',
        text: 'mensaje de prueba',
      })
      .then(() => {
        console.log('Correo enviado.');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar correo de factura
   * @param
   * @param pdf_name
   */
  public async sendBill(
    correo: string,
    nombre: string,
    dte: string,
    fecha: string,
    serie: string,
  ) {
    await this.refreshConfig();
    console.log('enviando factura...');
    this.mailerService
      .sendMail({
        to: correo,
        subject: 'Envio de DTE ' + dte,
        template: 'bill-mail',
        context: {
          // Data to be sent to template engine.
          logo: this.info.logo,
          nombre_cliente: nombre,
          fecha: fecha,
          serie: serie,
          noDocumento: dte,

          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
        attachments: [
          {
            filename: dte,
            path: 'uploads/docs/' + dte + '.pdf',
            contentType: 'application/pdf',
          },
        ],
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar correo de tratamiento
   * @param
   * @param pdf_name
   */
  public async sendTratamiento(
    idTratamiento: number,
    nombreParciente: String,
    correo: string,
  ) {
    await this.refreshConfig();
    console.log('enviando tratamiento...');
    this.mailerService
      .sendMail({
        to: correo,
        subject: 'AniMed',
        template: 'treatment-mail',
        context: {
          // Data to be sent to template engine.
          logo: this.info.logo,
          nombre_cliente: nombreParciente,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
        attachments: [
          {
            filename: 'TR-' + String(idTratamiento),
            path:
              'uploads/tratamientos/' + 'TR-' + String(idTratamiento) + '.pdf',
            contentType: 'application/pdf',
          },
        ],
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar notificaciones por disponibilidad de documentos fel
   * @params correo, cantidad
   *
   */
  public async sendNotificationFel(correo: string, cantidad: string) {
    await this.refreshConfig();
    console.log('enviando notificacion....');
    this.mailerService
      .sendMail({
        to: correo,
        subject: 'Notificación de documentos Fel',
        template: 'notification-fel.pug',
        context: {
          disponible: cantidad,
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Enviar notificaciones por
   * @params correo
   *
   */
  public async sendNotAvailableNotificationFel(correo: string) {
    await this.refreshConfig();
    console.log('enviando notificacion....');
    this.mailerService
      .sendMail({
        to: correo,
        subject: 'Notificación de documentos Fel',
        template: 'notification-notAvailableFel.pug',
        context: {
          empresa: {
            correo: this.info.correo,
            direccion: this.info.direccion,
          },
        },
      })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Obtener la URL de la imagen
   * @param imagen
   * @private
   */
  private getURLImagen(imagen: string) {
    return this.info.url_imagenes + 'config/' + imagen;
  }
}
