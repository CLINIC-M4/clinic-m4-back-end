import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667836325806 implements MigrationInterface {
    name = 'createTables1667836325806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ExamesUserDoctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo_exame" character varying NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "hora" character varying NOT NULL, "resultado" character varying NOT NULL, "userIdId" uuid, "doctorIdId" uuid, CONSTRAINT "PK_9df698e69e453cc74ec2163cd32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" ADD CONSTRAINT "FK_fd41ff43c7a1ec39f38d1e9498f" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" ADD CONSTRAINT "FK_23eaea2d6ab30f2846b0510b228" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" DROP CONSTRAINT "FK_23eaea2d6ab30f2846b0510b228"`);
        await queryRunner.query(`ALTER TABLE "ExamesUserDoctor" DROP CONSTRAINT "FK_fd41ff43c7a1ec39f38d1e9498f"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "ExamesUserDoctor"`);
    }

}
