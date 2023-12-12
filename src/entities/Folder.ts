import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, JoinColumn } from 'typeorm';
import { User } from './User';
import { Files } from './Files';

@Entity()
export class Folders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @ManyToOne(() => User, user => user.folders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Files, Files => Files.user)
  files: Files[];
}
