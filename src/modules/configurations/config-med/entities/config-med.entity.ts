import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'configuracion_med' })
export class ConfigMed {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'numero_colegiado' })
  numero_colegiado: string;

  @Column({ name: 'especialidad' })
  especialidad: string;
}
