const { Op } = require('sequelize');  // Asegúrate de importar Op
const { Proyecto } = require("../../DB_conection.js");

// Función para verificar si un string es un UUID válido
const isUUID = (str) => {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(str);
};

// Controlador que busca el proyecto por ID o por nombre
const getProyectoController = async (param) => {
  try {
    let proyecto;

    // Si el parámetro es un UUID, se busca por ID
    if (isUUID(param)) {
      proyecto = await Proyecto.findByPk(param);  // Busca por ID (UUID)
    } else if (param && param.trim() !== "") {
      // Si no es un UUID, y es un nombre válido, se busca por nombre
      // Normalizamos el nombre para comparación sin importar mayúsculas/minúsculas
      const nombreFormateado = param.trim().replace(/-/g, " ").toLowerCase();

      // Búsqueda insensible a mayúsculas y minúsculas usando Op.iLike
      proyecto = await Proyecto.findOne({
        where: { nombre: { [Op.iLike]: nombreFormateado } },  // Usamos iLike para comparación insensible
      });
    } else {
      throw new Error("Se requiere un nombre o ID válido para buscar el proyecto.");
    }

    if (!proyecto) {
      throw new Error("Proyecto no encontrado.");
    }

    return proyecto;
  } catch (error) {
    throw new Error(`Error al obtener el proyecto: ${error.message}`);
  }
};

module.exports = { getProyectoController };
