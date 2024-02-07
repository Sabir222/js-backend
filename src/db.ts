import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "backenddb",
  password: process.env.DBPASSWORD,
  port: 5432,
});

export default pool;
