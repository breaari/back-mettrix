const transporter = require("../../mailtransport/transport"); // ✅ Importa bien

const sendContactEmail = async (input) => {
  const { nombre, empresa, email, telefono, consulta } = input;

  if (!nombre || !email || !telefono || !consulta) {
    console.log("Faltan datos en la solicitud:", input);
    return false;
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${nombre}\nEmpresa: ${empresa || "No especificada"}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta: ${consulta}`,
    };

    const info = await transporter.sendMail(mailOptions); // ✅ Llama correctamente
    return !!info;
  } catch (error) {
    console.error("Error en sendContactEmail:", error.message);
    return false;
  }
};

module.exports = sendContactEmail; // ❌ No uses `{ sendContactEmail }`, exporta directamente
