import { MigrationInterface, QueryRunner } from "typeorm";

export class examesDoctor1667859657205 implements MigrationInterface {
    name = 'examesDoctor1667859657205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "hour" character varying NOT NULL, "userId" uuid, "doctorId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(100) NOT NULL, "password" character varying(150) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ExamesUserDoctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo_exame" character varying NOT NULL, "data" character varying NOT NULL, "hora" character varying NOT NULL, "resultado" character varying NOT NULL, "userIdId" uuid, "doctorIdId" uuid, CONSTRAINT "PK_9df698e69e453cc74ec2163cd32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "crm" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "isAdm" boolean DEFAULT true, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "UQ_d7e8212b37dd4e61e996d7289cd" UNIQUE ("crm"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" ADD CONSTRAINT "FK_fd41ff43c7a1ec39f38d1e9498f" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" ADD CONSTRAINT "FK_23eaea2d6ab30f2846b0510b228" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" DROP CONSTRAINT "FK_23eaea2d6ab30f2846b0510b228"`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" DROP CONSTRAINT "FK_fd41ff43c7a1ec39f38d1e9498f"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "ExamesUserDoctor"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}