import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { ExamesUserDoctor } from "./examesUserDoctor.entity";

@Entity("TipoExame")
class TipoExame {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 125 })
  nome: string;

  @CreateDateColumn()
  data: Date;

  @Column()
  hora: string;

  @Column()
  resultado: string;

  @ManyToOne(() => ExamesUserDoctor)
  exames: ExamesUserDoctor;
}

export { TipoExame };
