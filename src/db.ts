import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test_data",
  password: "password",
  port: 2022,
});

export default pool;
