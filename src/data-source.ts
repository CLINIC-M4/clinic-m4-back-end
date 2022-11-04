import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  // Ambiente de execução default, verificar arquivo .env para modificações no ambientes de produção ou desenvolvimento.
  process.env.NODE_EXECUTION === "develop"
    ? {
        type: "postgres",
        host: process.env.DEVELOP_DB_HOST,
        port: 5432,
        username: process.env.DEVELOP_DB_USER,
        password: process.env.DEVELOP_DB_PASSWORD,
        database: process.env.DEVELOP_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PRIVAT_DB_HOST,
        port: 5432,
        username: process.env.PRIVAT_DB_USER,
        password: process.env.PRIVAT_DB_PASSWORD,
        database: process.env.PRIVAT_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
