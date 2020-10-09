const crearCategoria = function(categoria){
    return `INSERT INTO CATEGORIA (CAT_CODIGO, CAT_NOMBRE, CAT_USU)
     VALUES (
        '`+categoria.codigo+`',
        '`+categoria.nombre+`',
        `+categoria.usuario+`             
      ); `;
}

const todos = function(idUsuario){
  return `SELECT CAT.*,   COUNT(PRO.PRO_ID) AS PRODUCTOS  from CATEGORIA CAT
  LEFT OUTER JOIN PRODUCTO PRO ON CAT.CAT_ID = PRO.PRO_CAT_ID
  where CAT_USU = `+idUsuario+` GROUP BY CAT_ID `;
}

const obtenterPorId = function(id){
  return `SELECT * FROM CATEGORIA WHERE CAT_ID = `+id;
}

const eliminarPorId = function(id){
  return `DELETE FROM CATEGORIA WHERE CAT_ID = `+id;
}

const actualizarCategoria = function(categoria){
  return `UPDATE CATEGORIA SET
  CAT_CODIGO = '`+categoria.codigo+`',
  CAT_NOMBRE = '`+categoria.nombre+`'
  WHERE CAT_ID = `+categoria.id;
}


module.exports.crearCategoria = crearCategoria;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarCategoria = actualizarCategoria;



