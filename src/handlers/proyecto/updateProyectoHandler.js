const { updateProyectoController } = require("../../controllers/proyecto/updateProyectoController");

const updateProyectoHandler = async (req, res) => {
    const { id } = req.params;
    const { imagenesEliminar } = req.body; // Obtener las imágenes que se deben eliminar
    const imagenes = req.files; // Las imágenes nuevas a cargar

    let imagenActualizada = req.body.imagen || ''; // Si no hay imagen, dejamos como cadena vacía

    // Si hay nuevas imágenes, las agregamos a la propiedad 'imagen'
    if (Array.isArray(imagenes)) {
        for (let i = 0; i < imagenes.length; i++) {
            imagenActualizada += (imagenActualizada ? ',' : '') + 'uploads/' + imagenes[i].filename;
        }
    }

    // Preparamos los datos de actualización para el proyecto
    const updateData = {
        ...req.body,
        imagen: imagenActualizada,
        imagenesEliminar: imagenesEliminar ? JSON.parse(imagenesEliminar) : [],
    };

    console.log("updateData:", updateData);

    try {
        const result = await updateProyectoController(id, updateData);

        if (result.success) {
            res.status(200).json({ success: true, proyecto: result.proyecto });
        } else {
            res.status(404).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error en el controlador updateProyectoHandler:', error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

module.exports = { updateProyectoHandler };
