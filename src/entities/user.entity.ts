import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Schedule } from "./schedule.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  @Column({ length: 150 })
  name: string;
  @Column({ length: 100, unique: true, nullable: false })
  email: string;
  @Column({ length: 100, unique: true, nullable: false })
  cpf: string;
  @Column({ length: 150 })
  @Exclude()
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: false, default: false })
  isAdm: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];
}
