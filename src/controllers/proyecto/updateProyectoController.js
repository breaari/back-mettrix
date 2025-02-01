// const { Proyecto } = require("../../DB_conection");
// const fs = require("fs");
// const path = require("path");

// const updateProyectoController = async (id, updateData) => {
//     try {
//         // Buscar el proyecto por su ID
//         const proyecto = await Proyecto.findByPk(id);
        
//         if (!proyecto) {
//             return { success: false, message: "Proyecto no encontrado" };
//         }

//         // Asegurarse de que multimedia sea un array
//         let multimedia = proyecto.multimedia;
//         if (typeof multimedia === "string") {
//             multimedia = multimedia.split(","); // Si es un string, convertirlo en un array
//         }

//         // Eliminar imágenes si se envían
//         if (updateData.imagenesEliminar && Array.isArray(updateData.imagenesEliminar)) {
//             // Eliminar imágenes del servidor
//             updateData.imagenesEliminar.forEach((imagen) => {
//                 const normalizedPath = imagen.replace(/\\/g, "/");
//                 const imagePath = path.join(__dirname, "../../../", normalizedPath);

//                 // Verificar si la imagen existe
//                 if (fs.existsSync(imagePath)) {
//                     fs.unlinkSync(imagePath); // Eliminar imagen
//                     console.log(`Imagen eliminada: ${imagePath}`);
//                 } else {
//                     console.log(`Imagen no encontrada: ${imagePath}`);
//                 }
//             });

//             // Actualizar el campo multimedia para eliminar las imágenes eliminadas
//             const updatedMultimedia = multimedia.filter(
//                 (img) => !updateData.imagenesEliminar.includes(img)
//             );
//             updateData.multimedia = updatedMultimedia;
//         }

//         // Agregar nuevas imágenes si existen
//         if (updateData.imagen && updateData.imagen.length > 0) {
//             const nuevasImagenes = updateData.imagen.split(","); // Convertir las imágenes a array
//             updateData.multimedia = [...multimedia, ...nuevasImagenes]; // Agregar nuevas imágenes
//         }

//         // Actualizar la información del proyecto en la base de datos
//         await proyecto.update(updateData);

//         return { success: true, proyecto };
//     } catch (error) {
//         console.error("Error al actualizar proyecto:", error);
//         return { success: false, message: "Error al actualizar proyecto. Por favor, inténtelo de nuevo más tarde." };
//     }
// };

// module.exports = { updateProyectoController };

const { Proyecto } = require("../../DB_conection");
const fs = require("fs");
const path = require("path");

const updateProyectoController = async (id, updateData) => {
    try {
        // Verificar que updateData sea correcto
        console.log("updateData recibido:", updateData);

        // Buscar el proyecto por su ID
        const proyecto = await Proyecto.findByPk(id);
        
        if (!proyecto) {
            console.log("Proyecto no encontrado");
            return { success: false, message: "Proyecto no encontrado" };
        }

        // Asegurarse de que multimedia sea un array
        let multimedia = proyecto.multimedia;
        if (typeof multimedia === "string") {
            multimedia = multimedia.split(","); // Si es un string, convertirlo en un array
        }

        console.log("Multimedia actual del proyecto:", multimedia);

        // Asegurarse de que archivosEliminar esté correctamente formateado como array
        if (updateData.archivosEliminar) {
            // Convertirlo de string a array si es necesario
            if (typeof updateData.archivosEliminar === "string") {
                console.log("ArchivosEliminar es un string, convirtiendo:", updateData.archivosEliminar);
                updateData.archivosEliminar = JSON.parse(updateData.archivosEliminar);
            }

            console.log("ArchivosEliminar (formateado como array):", updateData.archivosEliminar);

            // Eliminar archivos (imágenes o videos) si se envían
            updateData.archivosEliminar.forEach((archivo) => {
                const normalizedPath = archivo.replace(/\\/g, "/");
                const archivoPath = path.join(__dirname, "../../../", normalizedPath);

                // Verificar si el archivo existe
                if (fs.existsSync(archivoPath)) {
                    fs.unlinkSync(archivoPath); // Eliminar archivo (imagen o video)
                    console.log(`Archivo eliminado: ${archivoPath}`);
                } else {
                    console.log(`Archivo no encontrado: ${archivoPath}`);
                }
            });

            // Actualizar el campo multimedia para eliminar los archivos eliminados
            const updatedMultimedia = multimedia.filter(
                (arch) => !updateData.archivosEliminar.includes(arch)
            );
            updateData.multimedia = updatedMultimedia;
        }

        // Verificar multimedia después de la eliminación
        console.log("Multimedia actualizada después de eliminar archivos:", updateData.multimedia);

        // Agregar nuevas imágenes o videos si existen
        if (updateData.imagen && updateData.imagen.length > 0) {
            const nuevosArchivos = updateData.imagen.split(","); // Convertir los archivos a array
            updateData.multimedia = [...multimedia, ...nuevosArchivos]; // Agregar nuevos archivos
        }

        // Actualizar la información del proyecto en la base de datos
        console.log("Actualizando proyecto con los siguientes datos:", updateData);
        await proyecto.update(updateData);

        return { success: true, proyecto };
    } catch (error) {
        console.error("Error al actualizar proyecto:", error);
        return { success: false, message: "Error al actualizar proyecto. Por favor, inténtelo de nuevo más tarde." };
    }
};

module.exports = { updateProyectoController };
