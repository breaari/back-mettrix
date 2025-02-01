const { Usuario } = require("../../DB_conection");

const deleteUsuarioController = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return { success: false, message: "Usuario no encontrado" };
    }

    await usuario.destroy();
    return { success: true, message: "Usuario eliminado exitosamente" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, message: "Error al eliminar usuario. Por favor, inténtelo de nuevo más tarde" };
  }
}

module.exports = { deleteUsuarioController };