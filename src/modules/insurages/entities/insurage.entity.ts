import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'seguro' })
export class Insurage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true })
  USERDEF_1: string;

  @Column({ nullable: true })
  USERDER_2: string;
}
