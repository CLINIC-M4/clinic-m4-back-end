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
import { TipoExame } from "./exames.entity";

@Entity("ExamesUserDoctor")
class ExamesUserDoctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user_id: User;

  @ManyToOne(() => Doctor)
  doctor_id: Doctor;

  @OneToMany(() => TipoExame, (tipoexame) => tipoexame.exames)
  tipo_exame: TipoExame[];

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  hora: string;
}

export { ExamesUserDoctor };
