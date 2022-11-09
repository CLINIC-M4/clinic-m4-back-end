import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";

@Entity("ExamesUserDoctor")
class ExamesUserDoctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Doctor)
  @JoinColumn()
  doctor: Doctor;

  @Column()
  tipo_exame: string;

  @Column()
  data: string;

  @Column()
  hora: string;

  @Column()
  resultado: string;
  doctor: any;
}

export { ExamesUserDoctor };
