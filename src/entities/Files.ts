import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { User } from "./User";
import { Folders } from "./Folder"; 

@Entity()
export class Files extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text" })
  type: string;

  @Column({ type: "text" })
  path: string;

  @ManyToOne(() => User, user => user.files, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Folders, folder => folder.files, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "folder_id" })
  folder: Folders;
}
