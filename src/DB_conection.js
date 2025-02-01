require("dotenv").config();
const { Sequelize } = require("sequelize");

// Obtención de las variables de entorno
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

// Importar los modelos
const ProyectoModel = require("./models/proyecto");
const UsuarioModel = require("./models/usuario");

// Definir los modelos con Sequelize
const Proyecto = ProyectoModel(sequelize);
const Usuario = UsuarioModel(sequelize);

// // Definir relaciones entre los modelos (si es necesario)
// // Ejemplo: Si un Proyecto pertenece a un Usuario (relación 1:N)
// Proyecto.belongsTo(Usuario, { foreignKey: 'id_usuario' });
// Usuario.hasMany(Proyecto, { foreignKey: 'id_usuario' });

// Sincronizar la base de datos con los modelos
sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((err) => {
    console.error('Error sincronizando las tablas:', err);
  });

module.exports = {
  Proyecto,
  Usuario,
  conn: sequelize,
};
