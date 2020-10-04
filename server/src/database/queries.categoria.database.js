const crearCategoria = function(categoria){
    return `INSERT INTO CATEGORIA (CAT_NOMBRE, CAT_USU)
     VALUES (
        '`+categoria.nombre+`',
        `+categoria.usuario+`             
      ); `;
}

const todos = function(){
  return `SELECT * FROM CATEGORIA `;
}

const obtenterPorId = function(id){
  return `SELECT * FROM CATEGORIA WHERE CAT_ID = `+id;
}

const eliminarPorId = function(id){
  return `DELETE FROM CATEGORIA WHERE CAT_ID = `+id;
}

const actualizarCategoria = function(categoria){
  return `UPDATE CATEGORIA SET
  CAT_NOMBRE = '`+categoria.nombre+`',
  CAT_USU = `+categoria.usuario+`
  WHERE CAT_ID = `+categoria.id;
}


module.exports.crearCategoria = crearCategoria;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarCategoria = actualizarCategoria;



