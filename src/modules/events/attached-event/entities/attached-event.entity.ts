import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'evento_adjunto' })
export class AttachedEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ruta', type: 'longtext' })
  ruta: string;

  @Column({ name: 'idEvento' })
  idEvento: number;
}
