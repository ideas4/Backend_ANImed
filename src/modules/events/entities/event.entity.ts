import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'evento' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'cuerpo', type: 'longtext' })
  cuerpo: string;

  @Column({ name: 'tratamiento', type: 'longtext' })
  tratamiento: string;

  @Column({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @Column({ name: 'isAdjunto', type: 'tinyint', nullable: true })
  isAdjunto: number;

  @Column({ name: 'idCliente' })
  idCliente: number;
}
