import { sqlConnect, sql } from "../utilities/sql.js";
import { hashPassword, verifyPassword } from "../utilities/crypto-utils.js";

export const login = async(req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .query("SELECT * FROM users WHERE username=@username");
  
  // Si no hay usuario, retornar error
  if (data.recordset.length === 0) {
    return res.status(200).json({ isLogin: false, user: {} });
  }
  
  const user = data.recordset[0];
  
  // Verificar la contraseña hasheada usando la sal almacenada
  const isLogin = verifyPassword(req.body.password, user.password, user.salt);
  
  if(isLogin) {
    // No enviar la contraseña ni la sal al cliente
    const { password, salt, ...userWithoutSensitiveData } = user;
    res.status(200).json({ isLogin: isLogin, user: userWithoutSensitiveData });
  } else {
    res.status(200).json({ isLogin: isLogin, user: {} });
  }
};

// Función para crear un nuevo usuario
export const register = async(req, res) => {
  try {
    const { username, password, ...otherUserData } = req.body;
    
    // Generar sal y hashear contraseña
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    
    const pool = await sqlConnect();
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("salt", sql.VarChar, salt)
      // Añadir otros campos según tu esquema
      .query("INSERT INTO users (username, password, salt) VALUES (@username, @password, @salt); SELECT SCOPE_IDENTITY() AS id");
    
    const userId = result.recordset[0].id;
    
    res.status(201).json({ 
      success: true, 
      message: "Usuario registrado correctamente",
      userId 
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al registrar usuario" 
    });
  }
};

// Función para actualizar las contraseñas existentes (ejecutar una sola vez)
export const updatePasswords = async(req, res) => {
  try {
    const pool = await sqlConnect();
    const users = await pool
      .request()
      .query("SELECT id, username, password FROM users");
    
    let updatedCount = 0;
    
    for (const user of users.recordset) {
      const salt = generateSalt();
      // Usamos la contraseña actual como texto plano para hashearla
      const hashedPassword = hashPassword(user.password, salt);
      
      await pool
        .request()
        .input("id", sql.Int, user.id)
        .input("password", sql.VarChar, hashedPassword)
        .input("salt", sql.VarChar, salt)
        .query("UPDATE users SET password = @password, salt = @salt WHERE id = @id");
      
      updatedCount++;
    }
    
    res.status(200).json({ 
      success: true, 
      message: `${updatedCount} contraseñas actualizadas correctamente` 
    });
  } catch (error) {
    console.error("Error al actualizar contraseñas:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al actualizar contraseñas" 
    });
  }
};