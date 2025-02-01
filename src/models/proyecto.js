const { DataTypes, UUID } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Proyecto", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  multimedia: {
    type: DataTypes.JSON, // Para almacenar múltiples imágenes y videos
    allowNull: true,
    defaultValue: [],
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  funciones: {
    type: DataTypes.TEXT,
    allowNull: true,
},
},{
  timestamps: false
}
);
};
