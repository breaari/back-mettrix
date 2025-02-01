const server = require('./src/app.js');
const { conn } = require('./src/DB_conection.js');

conn.sync({ force: false }).then(() => {
  server.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
  });
});