const express = require('express');
const router = express.Router();
const path = require('path');
const { createUsuarioHandler } = require('../handlers/usuario/createUsuarioHandler');
const { getUsuariosHandler } = require('../handlers/usuario/getUsuarioHandler');
const { deleteUsuarioHandler } = require('../handlers/usuario/deleteUsuarioHandler');
const { updateUsuariosHandler } = require('../handlers/usuario/updateUsuarioHandler');
const { loginHandler } = require('../handlers/usuario/loginHandler');
const { getProyectoHandler } = require('../handlers/proyecto/getProyectoHandler');
const { updateProyectoHandler } = require('../handlers/proyecto/updateProyectoHandler');
const { createProyectoHandler } = require('../handlers/proyecto/createProyectoHandler');
const { deleteProyectoHandler } = require('../handlers/proyecto/deleteProyectoHandler');
const { getAllProyectosHandler } = require('../handlers/proyecto/getAllProyectosHandler')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Rutas
router.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

router.post("/login", loginHandler);
router.post("/usuarios", createUsuarioHandler);
router.get("/usuarios", getUsuariosHandler);
router.delete("/usuarios/:id", deleteUsuarioHandler);
router.put("/usuarios/:id", updateUsuariosHandler);

router.get("/proyectos", getAllProyectosHandler);
router.get("/proyectos/:param", getProyectoHandler);

// Actualización de proyecto con multer
router.put("/proyectos/:id", upload.array("multimedia", 10), updateProyectoHandler); // Ahora multer maneja archivos

router.post("/proyectos", upload.array("multimedia", 10), createProyectoHandler); // Solo aplica multer en la creación de proyectos
router.delete("/proyectos/:id", deleteProyectoHandler);

module.exports = router;
