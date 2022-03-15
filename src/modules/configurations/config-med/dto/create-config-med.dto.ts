import { IsDefined, IsString } from 'class-validator';

export class CreateConfigMedDto {
  id: number;

  @IsDefined({ message: 'Debe ingresar un nombre' })
  nombre: string;

  @IsDefined({ message: 'Debe ingresar un numero de colegiado' })
  numero_colegiado: string;

  @IsDefined({ message: 'Debe ingresar una especialidad.' })
  especialidad: string;
}
