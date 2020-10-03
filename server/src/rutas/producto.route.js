var express = require('express');
var usuarioService = require('../servicio/producto.service');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/todos', function(req, res) {
  var r = usuarioService.todos();
  console.log(r);
  var arrUsuarios = [
        {
            id:1,
            name:'jhon'
        }
      ] ;
  res.send(r); //send('About birds');

});

router.post('/Crear', function(req, res){
  var creanuevouser = usuarioService.crearProducto();
  res.send(creanuevouser);
});


router.get('/:id', function(req, res) {
    var id = req.params.id;
    var usuario = usuarioService.obtenterPorId(id);
    res.send(usuario);
  });

  router.delete('/eliminar/:id',function(req, res){
    var id = req.params.id;
    var mensaje = usuarioService.eliminarPorid(id);
    res.send(mensaje);
  });

 

  router.put('/actualizar/:id',function(req, res){
    var id = req.params.id;
    var actualizar = usuarioService.actualizarPorId(id);
    res.send(actualizar);
  });

  

 

module.exports = router;