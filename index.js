const server = require('./src/app.js');
const { conn } = require('./src/DB_conection.js');

// Usa process.env.PORT, o 3001 si no está definida la variable
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
});
