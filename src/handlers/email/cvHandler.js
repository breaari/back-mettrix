const sendApplicationEmailController = require("../../controllers/email/cvController");

const sendApplicationEmailHandler = (req, res) => {
  const multer = require("multer");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single("cv"); // 'cv' es el nombre del campo del formulario

  upload(req, res, async (err) => {
    if (err) {
      console.error("Error al subir el archivo:", err);
      return res.status(400).json({ error: "Error al subir el archivo" });
    }

    const input = req.body;

    try {
      const result = await sendApplicationEmailController(input, req.file.path); // Llamada correcta al controller

      if (result) {
        return res.status(200).json({ message: "CV enviado exitosamente" });
      } else {
        return res.status(400).json({ error: "Error al enviar el CV" });
      }
    } catch (error) {
      console.error("Error en formHandler:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
};

module.exports = { sendApplicationEmailHandler }; // ✅ Exportación correcta
