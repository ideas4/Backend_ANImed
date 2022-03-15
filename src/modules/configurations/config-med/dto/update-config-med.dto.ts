import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigMedDto } from './create-config-med.dto';

export class UpdateConfigMedDto extends PartialType(CreateConfigMedDto) {}
