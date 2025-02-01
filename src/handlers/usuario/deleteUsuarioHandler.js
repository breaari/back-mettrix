const { deleteUsuarioController } = require("../../controllers/usuario/deleteUsuarioController");

const deleteUsuarioHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUsuarioController(id);

    if (result.success) {
      return res.status(200).json(result);
    } else if (result.message === "Usuario no encontrado") {
      return res.status(404).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error interno. Por favor, inténtelo de nuevo más tarde." });
  }
}

module.exports = { deleteUsuarioHandler };