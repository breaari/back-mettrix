const express = require("express");
const { createUsuarioController } = require("../../controllers/usuario/createUsuarioController");

const createUsuarioHandler = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const user = await createUsuarioController(nombre, email, contraseña);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUsuarioHandler };