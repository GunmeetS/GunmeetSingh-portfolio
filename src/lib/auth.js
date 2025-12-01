import crypto from "crypto";

const validTokens = new Set();

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function addToken(token) {
  validTokens.add(token);

  setTimeout(() => {
    validTokens.delete(token);
  }, 24 * 60 * 60 * 1000);

  return token;
}

export function isValidToken(token) {
  return validTokens.has(token);
}

export function revokeToken(token) {
  validTokens.delete(token);
}

export function verifyPassword(password) {
  return password === process.env.ADMIN_PASSWORD;
}
