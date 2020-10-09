const { request } = require('express');
var express = require('express');
var productoService = require('../servicio/producto.service');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/todos/:id', async function (req, res) {
  var id = req.params.id;
  await productoService.todos(id).then(
    resp => {
      if (resp.success) {
        respuesta = resp.data;
      } else {
        respuesta = [];
      }
      res.send(respuesta);
    }
  );
});

router.get('/porid/:id', async function (req, res) {
  var id = req.params.id;
  await productoService.obtenterPorId(id).then(
    resp => {
      if (resp.success) {
        respuesta = resp.data;
      } else {
        respuesta = "";
      }
      res.send(respuesta);
    }
  );
});

router.post('/crear', async function (req, res) {
  var producto = req.body.producto;
  await productoService.crearproducto(producto).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'La producto fue creado con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al crear el producto',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
});




router.delete('/eliminar/:id', async function (req, res) {
  var id = req.params.id;
  await productoService.eliminarPorid(id).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'El producto se elimino con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al eliminar el producto',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
});



router.put('/actualizar', async function (req, res) {
  var producto = req.body.producto;
  await productoService.actualizar(producto).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'El producto fue actualizado con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al actualizar el producto',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
  
});





module.exports = router;