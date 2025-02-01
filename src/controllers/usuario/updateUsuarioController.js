const { Usuario } = require("../../DB_conection");

const updateUsuarioController = async (id, updatedData) => {
    try {
        // Buscar el usuario por su ID
        const user = await Usuario.findByPk(id);
        
        if (!user) {
            return { success: false, message: "Usuario no encontrado" };
        }

        // Actualizar la información del usuario
        await user.update(updatedData);

        return { success: true, user };
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return { success: false, message: "Error al actualizar usuario. Por favor, inténtelo de nuevo más tarde" };
    }
}

module.exports = { updateUsuarioController };