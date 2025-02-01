const express = require('express');
const { updateUsuarioController } = require('../../controllers/usuario/updateUsuarioController')

const updateUsuariosHandler = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await updateUsuarioController(id, updatedData);

    if (result.success) {
        res.status(200).json(result.user);
    } else {
        res.status(400).json({ message: result.message });
    }
};

module.exports = { updateUsuariosHandler }