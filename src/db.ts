import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "backenddb",
  password: "Sabir10win@@x",
  port: 5432,
});

export default pool;
