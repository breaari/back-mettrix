const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const multer = require('multer');  // Importamos multer
const routes = require('./routes/routes');

// Configuración de Multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Usamos un nombre único para el archivo
  },
});

const upload = multer({ storage: storage });  // Creamos el middleware de multer

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', '*'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
}));


// const fs = require('fs');
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }


// Serve static files (e.g., images)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// console.log("Ruta absoluta de uploads:", path.join(__dirname, 'uploads'));




// Log de todas las solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud ${req.method} a ${req.url}`);
  next();
});


app.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error("Error:", err);  // Log detallado del error
  res.status(status).json({ message: message, stack: err.stack });  // Devolver el stack trace en la respuesta (solo en desarrollo)
});

// // Rutas para manejar los proyectos, incluyendo multer para subir archivos
// app.use('/proyectos', upload.array('multimedia'), routes);  // Usamos multer en la ruta '/proyectos'

// Rutas generales
app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
