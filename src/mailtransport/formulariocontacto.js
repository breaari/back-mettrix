import transporter from "../config/transport.js";

const EnviarFormulario = async ({ nombre, empresa, email, telefono, consulta }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "tu-correo@ejemplo.com", // Reemplaza con tu correo
    subject: "Nuevo mensaje del formulario",
    text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta: ${consulta}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mensaje enviado con éxito" };
  } catch (error) {
    return { success: false, error: "Error al enviar el mensaje" };
  }
};

export default EnviarFormulario;
