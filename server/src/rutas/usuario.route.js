const { request } = require('express');
var express = require('express');
var usuarioService = require('../servicio/usuario.service');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/todos', async function (req, res) {
  await usuarioService.todos().then(
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
  await usuarioService.obtenterPorId(id).then(
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
  var usuario = req.body.usuario;
  await usuarioService.crearUsario(usuario).then(
    resp => {
      res.send(resp);
    }
  );
});
router.post('/login', async function (req, res) {
  var login = req.body.usuario; //se obtine los datos del usuario del body de la peticion y se almacena en la variable login
  await usuarioService.loginusuario(login).then(
    resp => {
      res.send(resp);
    }
  );
});


router.delete('/eliminar/:id', async function (req, res) {
  var id = req.params.id;
  await usuarioService.eliminarPorid(id).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'El usuario fue elimano con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al eliminar el usuario',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
});



router.put('/actualizar', async function (req, res) {
  var usuario = req.body.usuario;
  await usuarioService.actualizar(usuario).then(
    exito => {
      if (exito) {
        respuesta = {
          msg: 'El usuario fue actualizado con exito',
          success: true
        }
      } else {
        respuesta = {
          msg: 'ocurrio un error al actualizar el usuario',
          success: false
        }
      }
      res.send(respuesta);
    }
  );
  
});





module.exports = router;