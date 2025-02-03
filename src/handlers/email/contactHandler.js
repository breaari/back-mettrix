const sendContactEmail = require("../../controllers/email/contactController"); // ✅ Sin destructuración

const contactHandler = async (req, res) => {
  const input = req.body;

  try {
    const result = await sendContactEmail(input); // ✅ Llama correctamente

    if (result) {
      return res.status(200).json({ message: "Correo enviado exitosamente" });
    } else {
      return res.status(400).json({ error: "Error al enviar el correo" });
    }
  } catch (error) {
    console.error("Error en contactHandler:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { contactHandler };
