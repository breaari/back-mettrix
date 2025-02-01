const { getProyectoController } = require("../../controllers/proyecto/getProyectoController");

const getProyectoHandler = async (req, res) => {
  try {
    const { param } = req.params;  // Captura el parámetro de la ruta (ID o nombre del proyecto)

    // Llama al controlador para obtener el proyecto según el parámetro
    const proyecto = await getProyectoController(param);

    res.status(200).json(proyecto);  // Devuelve el proyecto encontrado
  } catch (error) {
    res.status(500).json({ message: error.message });  // Devuelve un error en caso de fallo
  }
};

module.exports = { getProyectoHandler };
