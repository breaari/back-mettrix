const { Proyecto } = require("../../DB_conection.js");

const createProyectoController = async (nombre, sector, multimedia, descripcion, funciones) => {
  try {
    if (!nombre || !sector || !descripcion) {
      throw new Error("Faltan parámetros obligatorios");
    }

    const nuevoProyecto = await Proyecto.create({
      nombre,
      sector,
      multimedia: multimedia || [],
      descripcion,
      funciones: funciones || "",
    });

    return nuevoProyecto;
  } catch (error) {
    throw new Error(`Error al crear el proyecto: ${error.message}`);
  }
};

module.exports = { createProyectoController };
