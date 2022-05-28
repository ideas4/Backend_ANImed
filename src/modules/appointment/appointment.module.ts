import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { AppointmentTypeModule } from './appointment-type/appointment-type.module';
import { SendMailService } from '../../services/mailer/send-mail.service';
import { SenderMailModule } from '../../services/mailer/mailer.module';
import { ConfigService } from '../configurations/config-admin/config.service';
import { ConfigEcommerceService } from '../configurations/config-ecommerce/config-ecommerce.service';
import { Config } from '../configurations/config-admin/entities/config.entity';
import { ConfigEcommerce } from '../configurations/config-ecommerce/entities/config-ecommerce.entity';
import { ProductQuoteEntity } from '../quote/entities/product-quote.entity';
import { QuoteEntity } from '../quote/entities/quote.entity';
import { QuoteStatusEntity } from '../quote/entities/quote-status.entity';
import { QuoteTimeEntity } from '../quote/entities/quote-time.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Product } from '../products/entities/product.entity';
import { FeaturedCategory } from '../configurations/config-ecommerce/entities/featured-categories.entity';
import { QuoteClientEntity } from '../quote/entities/quote-client.entity';
import { QuoteService } from '../quote/quote.service';
import { PdfGeneratorService } from 'src/services/pdf-generator/pdf-generator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      ProductQuoteEntity,
      QuoteEntity,
      QuoteStatusEntity,
      QuoteTimeEntity,
      Inventory,
      User,
      Config,
      ConfigEcommerce,
      Store,
      Product,
      FeaturedCategory,
      QuoteClientEntity,
    ]),
    AppointmentTypeModule,
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    QuoteService,
    PdfGeneratorService,
    ConfigService,
    ConfigEcommerceService,
    SendMailService,
  ],
})
export class AppointmentModule {}
