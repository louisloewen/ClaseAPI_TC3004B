import crypto from 'crypto';

// Función básica de hash
const createSimpleHash = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
};

// Prueba con un texto
const text = "contraseña123";
console.log(`Texto original: ${text}`);
const hash1 = createSimpleHash(text);
console.log(`Hash: ${hash1}`);

// Verificar que el mismo texto genera el mismo hash
const hash2 = createSimpleHash(text);
console.log(`Hash repetido: ${hash2}`);
console.log(`¿Son iguales? ${hash1 === hash2}`);

// Modificar ligeramente el texto
const modifiedText = "contraseña124";
console.log(`\nTexto modificado: ${modifiedText}`);
const hash3 = createSimpleHash(modifiedText);
console.log(`Hash modificado: ${hash3}`);
console.log(`¿Son diferentes? ${hash1 !== hash3}`);

// Sistema con sal
console.log('\n--- Sistema de contraseñas con sal ---');

const generateSalt = (length = 16) => {
  return crypto.randomBytes(length).toString('hex');
};

const hashPassword = (password, salt) => {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return hash.toString('hex');
};

const password = "MiContraseña123";
console.log(`Contraseña: ${password}`);

// Generar dos sales diferentes
const salt1 = generateSalt();
const salt2 = generateSalt();

console.log(`Sal 1: ${salt1}`);
console.log(`Sal 2: ${salt2}`);

// Hashear la misma contraseña con diferentes sales
const hashedPassword1 = hashPassword(password, salt1);
const hashedPassword2 = hashPassword(password, salt2);

console.log(`\nHash con sal 1: ${hashedPassword1}`);
console.log(`Hash con sal 2: ${hashedPassword2}`);
console.log(`¿Son diferentes a pesar de ser la misma contraseña? ${hashedPassword1 !== hashedPassword2}`);

// Verificar funcionamiento correcto
const isValid = hashPassword(password, salt1) === hashedPassword1;
console.log(`\n¿Verificación correcta? ${isValid}`);