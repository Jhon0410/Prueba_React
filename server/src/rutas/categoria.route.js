const { request } = require('express');
var express = require('express');
var categoriaService = require('../servicio/categoria.service');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/todos', async function (req, res) {
  await categoriaService.todos().then(
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
  await categoriaService.obtenterPorId(id).then(
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
  var categoria = req.body.categoria;
  await categoriaService.crearCategoria(categoria).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'La categoria fue creado con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al crear la categoria',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
});




router.delete('/eliminar/:id', async function (req, res) {
  var id = req.params.id;
  await categoriaService.eliminarPorid(id).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'la categoria fue elimano con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al eliminar la categoria',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
});



router.put('/actualizar', async function (req, res) {
  var categoria = req.body.categoria;
  await categoriaService.actualizar(categoria).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'la categoria fue actualizado con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al actualizar la categoria',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
  
});





module.exports = router;