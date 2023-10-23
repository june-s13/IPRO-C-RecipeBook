import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

export function compareHash(s, hash) {
  return bcrypt.compareSync(s, hash)
}

export function hash(str) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  return bcrypt.hashSync(str, salt)
}