const express = require("express");
const { loginCotroller } = require("../../controllers/usuario/loginController");

 const loginHandler = async (req, res) => {
  const { email, contraseña } = req.body;

  const result = await loginCotroller(email, contraseña);

  if (result.success) {
    res.status(200).json({ success: true, usuario: result.usuario });
  } else {
    res.status(401).json({ success: false, message: result.message });
  }
};

module.exports = { loginHandler};