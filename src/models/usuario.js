const { DataTypes, UUID } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Usuario", {
    id_usuario: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Asegura que no haya emails duplicados
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false
  }
);
};
