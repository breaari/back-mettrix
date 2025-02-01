const { Usuario } = require("../../DB_conection.js");

const createUsuarioController = async (nombre, email, contraseña) => {
  try {
    // Validación
    if (!nombre || !email || !contraseña) {
      throw new Error("Faltan parámetros");
    }

    // Crear el usuario
    const user = await Usuario.create({
      nombre,
      email,
      contraseña,
    });

    return user;
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
};

module.exports = { createUsuarioController };