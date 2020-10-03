let  obtenerTodos = function(){
    console.log('obtenerTodos');
   var arrCategoria = [
       {
           id:1,
           name:'jhon'
       },
       {
           id:1,
           name:'jhon'
       }
   ];
   return arrCategoria;
}

let crearCategoria = function(){
   var guardarUsarioNuevo = [{
       id:id,
       name:'jhon'
   }];
   return guardarUsarioNuevo;
}

let obtenterPorId = function (id){
   var usuario = {
       id:id,
       name:'jhon'
   };
   return usuario;
}

let eliminarPorid = function (id){
   return 'se elimino el ususario con id' + id;
}

let actualizarPorId = function (id){
   var usuarioup={
       id:id,
       name:'edwar'
   };
   return usuarioup;
   }






exports.todos = obtenerTodos;
exports.obtenterPorId = obtenterPorId;
exports.eliminarPorid = eliminarPorid;
exports.actualizarPorId = actualizarPorId;
exports.crearUsario = crearCategoria;

