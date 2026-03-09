import { Pool } from "pg"

export const pool = new Pool({
  host: "studybuddy-db-01.postgres.database.azure.com",
  port: 5432,
  database: "postgres",
  user: "studybuddyadmin",
  password: "abcdef#123",
  ssl: {
    rejectUnauthorized: false
  }
})