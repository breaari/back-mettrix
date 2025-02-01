const { Proyecto } = require("../../DB_conection.js");

// Controlador para obtener todos los proyectos
const getAllProyectosController = async () => {
  try {
    const proyectos = await Proyecto.findAll(); // Obtiene todos los proyectos
    if (!proyectos || proyectos.length === 0) {
      throw new Error("No se encontraron proyectos.");
    }
    return proyectos;
  } catch (error) {
    throw new Error(`Error al obtener los proyectos: ${error.message}`);
  }
};

module.exports = { getAllProyectosController };
