const jwt = require("jsonwebtoken");

export async function decodeJWT(token) {
  let secret = process.env.JWT_SECRET_KEY;
  const data = jwt.decode(token, secret);
  return data;
}
