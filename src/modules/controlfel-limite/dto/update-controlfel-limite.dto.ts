import { PartialType } from '@nestjs/mapped-types';
import { CreateControlFelLimite } from './create-controlfel-limite.dto';

export class UpdateControlFelLimite extends PartialType(
  CreateControlFelLimite,
) {}
