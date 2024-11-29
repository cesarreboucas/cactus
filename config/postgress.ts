import { Sequelize } from "sequelize";
import pg from "pg";

// Option 1: Passing a connection URI
// console.log(process.env);
if (
  process.env.POSTGRESS_CS_DB === undefined ||
  process.env.POSTGRESS_CS_USER === undefined ||
  process.env.POSTGRESS_CS_PASS === undefined
) {
  throw new Error("POSTGRESS_CS environment variable is not defined");
}
export default new Sequelize({
  database: process.env.POSTGRESS_CS_DB,
  username: process.env.POSTGRESS_CS_USER,
  password: process.env.POSTGRESS_CS_PASS,
  host: process.env.POSTGRESS_CS_HOST,
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});
