import {
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Entity,
} from "typeorm";

import { Schedule } from "./schedule.entity";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  crm: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ nullable: true, default: true })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.doctor)
  schedule: Schedule[];

  //   @OneToMany(() => Address, (address) => address.id)
  //   address: string;

  //   @OneToMany(() => Specialization, (specialization) => address.id)
  //   specialization: string;
}
