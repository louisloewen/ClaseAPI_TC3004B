import crypto from 'crypto';

// Función para generar una sal aleatoria
export const generateSalt = (length = 16) => {
  return crypto.randomBytes(length).toString('hex');
};

// Función para hashear contraseña con sal
export const hashPassword = (password, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return hash.toString('hex');
};

// Función para verificar contraseña
export const verifyPassword = (password, storedHash, salt) => {
  const hash = hashPassword(password, salt);
  return hash === storedHash;
};