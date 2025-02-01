const { Proyecto } = require("../../DB_conection.js");

const deleteProyectoController = async (id) => {
  try {
    if (!id) {
      throw new Error("Se requiere un ID para eliminar el proyecto.");
    }

    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      throw new Error("Proyecto no encontrado.");
    }

    await proyecto.destroy();
    return { message: "Proyecto eliminado con éxito." };
  } catch (error) {
    throw new Error(`Error al eliminar el proyecto: ${error.message}`);
  }
};

module.exports = { deleteProyectoController };
