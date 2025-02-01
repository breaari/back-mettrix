const { Usuario } = require("../../DB_conection");

 const loginCotroller = async (email, contraseña) => {

  try {
    const usuario = await Usuario.findOne({
      where: {
        email: email,
        contraseña: contraseña,
      },
    });

    if (!usuario) {
      return { success: false, message: "Correo electrónico o contraseña incorrectos" };
    }

    return { success: true, usuario: usuario };
  } catch (error) {
    return { success: false, message: "Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde" };
  }
}

module.exports= { loginCotroller};