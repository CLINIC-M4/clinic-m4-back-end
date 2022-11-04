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

import { v4 as uuid } from "uuid";
import { Schedule } from "./schedule.entity";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, unique: true, nullable: false })
  name: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ length: 100, unique: true, nullable: false })
  crm: string;

  @Column({ nullable: false }) //verificar alguma configuração, talvez em string para adicionar números grandes(com DDD)
  telephone: number;

  @Column({ length: 100, nullable: false })
  password: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
