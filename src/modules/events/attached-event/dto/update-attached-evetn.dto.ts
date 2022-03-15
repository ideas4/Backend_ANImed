import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachedEventDto } from './create-attached-event.dto';

export class UpdateAttachedEventDto extends PartialType(
  CreateAttachedEventDto,
) {}
