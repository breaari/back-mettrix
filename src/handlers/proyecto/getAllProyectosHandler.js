const { getAllProyectosController } = require("../../controllers/proyecto/getAllProyectosController");

const getAllProyectosHandler = async (req, res) => {
  try {
    const proyectos = await getAllProyectosController();
    res.status(200).json(proyectos); // Retorna los proyectos en formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // En caso de error, retorna un mensaje
  }
};

module.exports = { getAllProyectosHandler };