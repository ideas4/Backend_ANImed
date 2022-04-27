import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { AttachedEventModule } from './attached-event/attached-event.module';
import { QuoteService } from '../quote/quote.service';
import { PdfGeneratorService } from 'src/services/pdf-generator/pdf-generator.service';
import { ConfigService } from '../configurations/config-admin/config.service';
import { ConfigEcommerceService } from '../configurations/config-ecommerce/config-ecommerce.service';
import { SendMailService } from 'src/services/mailer/send-mail.service';
import { ProductQuoteEntity } from '../quote/entities/product-quote.entity';
import { QuoteEntity } from '../quote/entities/quote.entity';
import { QuoteStatusEntity } from '../quote/entities/quote-status.entity';
import { QuoteTimeEntity } from '../quote/entities/quote-time.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { User } from '../users/entities/user.entity';
import { Config } from '../configurations/config-admin/entities/config.entity';
import { ConfigEcommerce } from '../configurations/config-ecommerce/entities/config-ecommerce.entity';
import { Store } from '../stores/entities/store.entity';
import { Product } from '../products/entities/product.entity';
import { FeaturedCategory } from '../configurations/config-ecommerce/entities/featured-categories.entity';
import { QuoteClientEntity } from '../quote/entities/quote-client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
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
    AttachedEventModule,
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    QuoteService,
    PdfGeneratorService,
    ConfigService,
    ConfigEcommerceService,
    SendMailService,
  ],
})
export class EventsModule {}
