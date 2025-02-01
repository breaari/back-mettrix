const { Usuario } = require("../../DB_conection");

const getUsuariosController = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return { success: true, usuarios: usuarios };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return { success: false, message: "Error al obtener usuarios. Por favor, inténtelo de nuevo más tarde" };
  }
}

module.exports = { getUsuariosController };