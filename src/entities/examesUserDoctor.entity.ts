import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";

@Entity("ExamesUserDoctor")
class ExamesUserDoctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user_id: User;

  @ManyToOne(() => Doctor)
  doctor_id: Doctor;

  @Column()
  tipo_exame: String;

  @CreateDateColumn()
  data: Date;

  @Column()
  hora: string;

  @Column()
  resultado: String;
}

export { ExamesUserDoctor };
