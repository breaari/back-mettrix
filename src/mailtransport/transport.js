const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Host de Hostinger para SMTP
  port: 465, // Puerto para SMTP con SSL
  secure: true, // Habilitar SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Dirección de correo desde el archivo .env
    pass: process.env.EMAIL_PASS,
    method: 'LOGIN', // Contraseña desde el archivo .env
  },
  logger: true,  // Habilitar registros de conexión
  debug: true, 
});

module.exports = transporter; // 🚀 Exporta correctamente
