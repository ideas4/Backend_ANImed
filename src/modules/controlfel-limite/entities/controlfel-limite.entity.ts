import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'controlfel-limite' })
export class ControlFelLimite {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  porcentaje_minimo_notification: string;
}
