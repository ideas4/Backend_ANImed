import { PartialType } from '@nestjs/mapped-types';
import { CreateInsurageDto } from './create-insurage.dto';

export class UpdateInsurageDto extends PartialType(CreateInsurageDto) {}
