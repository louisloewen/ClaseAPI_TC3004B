import mongoose from "mongoose";
import { generateSalt, hashPassword } from "./crypto-utils.js";

// Conexión a MongoDB
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
};

// Esquema de usuario con soporte para contraseñas hasheadas
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  // Otros campos que necesites
}, { timestamps: true });

// Método para verificar contraseña
userSchema.methods.verifyPassword = function(password) {
  const hash = hashPassword(password, this.salt);
  return hash === this.password;
};

// Método pre-save para hashear contraseñas automáticamente
userSchema.pre('save', function(next) {
  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!this.isModified('password')) return next();
  
  const salt = generateSalt();
  this.salt = salt;
  this.password = hashPassword(this.password, salt);
  next();
});

// Crear modelo de usuario
export const User = mongoose.model('User', userSchema);

// Método para actualizar todas las contraseñas existentes (ejecutar una sola vez)
export const updateAllPasswords = async () => {
  try {
    const users = await User.find({});
    let updatedCount = 0;
    
    for (const user of users) {
      // Solo actualizar si no tiene sal (asumiendo que las contraseñas sin sal están en texto plano)
      if (!user.salt) {
        const plainPassword = user.password; // guardar la contraseña en texto plano
        const salt = generateSalt();
        user.salt = salt;
        user.password = hashPassword(plainPassword, salt);
        await user.save();
        updatedCount++;
      }
    }
    
    console.log(`${updatedCount} contraseñas actualizadas en MongoDB`);
    return updatedCount;
  } catch (error) {
    console.error("Error al actualizar contraseñas en MongoDB:", error);
    throw error;
  }
};