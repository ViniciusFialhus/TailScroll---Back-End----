import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity()
export class Rpg_systems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

}
