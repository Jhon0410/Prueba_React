const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const rutasUsuario = require("./src/rutas/usuario.route");
const rutasCategoria = require("./src/rutas/categoria.route");
const rutasProductos = require("./src/rutas/producto.route");
const db = require('./src/database/schema.database');


const app = express();
//se construye la base de datos

db.creardb();

app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
  res.send('Bienvenido a la prueba backend APPSUS');
});
app.use('/api/usuario', rutasUsuario);
app.use('/api/categoria', rutasCategoria);
app.use('/api/producto', rutasProductos);


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
