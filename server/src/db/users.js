import { pool } from "./client.js";

export async function registerUser(email, password) {
  const res = await pool.query(
    "INSERT INTO \"User\" (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, password]
  )
  return res.rows[0]
}

export async function getUserByEmail(email) {
  const res = await pool.query(
    "SELECT id, email, password FROM \"User\" WHERE email=$1",
    [email]
  )
  return res.rows[0]
}