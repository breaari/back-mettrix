const { createProyectoController } = require("../../controllers/proyecto/createProyectoController");

const createProyectoHandler = async (req, res) => {
  console.log("handler:", req.body);

  // Verifica que los archivos hayan sido cargados correctamente
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No se han subido archivos multimedia." });
  }

  try {
    // Llamar al controlador para crear el proyecto
    const { nombre, sector, descripcion, funciones } = req.body;
    // Reemplazamos las barras invertidas por barras normales y solo tomamos el primer archivo
    const multimedia = req.files.length > 0 ? req.files.map(file => file.path.replace("\\", "/")) : [];  // Recolecta las rutas de los archivos cargados

    // Si quieres obtener solo el primer archivo y asignarlo como imagen:
    const imagen = multimedia.length > 0 ? multimedia[0] : '';

    // Llamamos al controlador de creación de proyectos con el nuevo campo 'imagen'
    const nuevoProyecto = await createProyectoController(
      nombre,
      sector,
      imagen,  // Aquí estamos pasando solo el primer archivo como imagen
      descripcion,
      funciones
    );

    // Aquí, agregamos success: true para indicar que la creación fue exitosa
    res.status(201).json({
      success: true,  // Indicamos que la operación fue exitosa
      data: nuevoProyecto  // Devolvemos los datos del nuevo proyecto creado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProyectoHandler };

