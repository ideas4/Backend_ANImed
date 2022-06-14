import { IsNotEmpty } from 'class-validator';

export class CreateInsurageDto {
  id: number;
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  USERDEF_1: string;

  USERDER_2: string;
}
