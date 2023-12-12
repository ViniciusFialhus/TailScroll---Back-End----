import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Folders } from './Folder';
import { Files } from './Files';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Folders, folder => folder.user)
  folders: Folders[];

  @OneToMany(() => Folders, folder => folder.user)
  files: Files[];

}
