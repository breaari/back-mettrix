const express = require("express");
const { deleteProyectoController } = require("../../controllers/proyecto/deleteProyectoController");

const deleteProyectoHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await deleteProyectoController(id);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteProyectoHandler };
