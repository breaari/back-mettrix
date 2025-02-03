const transporter = require("../../mailtransport/transport"); // ✅ Importa correctamente

const sendApplicationEmailController = async (input, filePath) => {
  const { nombre, email, area } = input;

  if (!nombre || !email || !area || !filePath) {
    console.log("Faltan datos en la solicitud:", input);
    return false;
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Tu propio correo
      subject: `Nueva solicitud de empleo: ${area}`,
      text: `Nombre: ${nombre}\nCorreo Electrónico: ${email}\nÁrea: ${area}`,
      attachments: [
        {
          path: filePath, // Adjuntamos el archivo
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions); // ✅ Llama correctamente
    return !!info; // ✅ Retorna true si la información fue enviada correctamente
  } catch (error) {
    console.error("Error en sendApplicationEmail:", error.message);
    return false;
  }
};

module.exports = sendApplicationEmailController; // ✅ Exporta correctamente
