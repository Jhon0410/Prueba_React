const crearProductos = function(producto){
    return `INSERT INTO PRODUCTO (PRO_NOMBRE, PRO_PRECIO, PRO_STOCK, PRO_CAT_ID)
     VALUES (
        '`+producto.nombre+`',
        '`+producto.precio+`',
        '`+producto.stock+`',
        `+producto.categoria+`             
      ); `;
}

const todos = function(){
  return `SELECT * FROM PRODUCTO `;
}

const obtenterPorId = function(id){
  return `SELECT * FROM PRODUCTO WHERE PRO_ID = `+id;
}

const eliminarPorId = function(id){
  return `DELETE FROM PRODUCTO WHERE PRO_ID = `+id;
}

const actualizarProducto = function(producto){
  return `UPDATE PRODUCTO SET
  PRO_NOMBRE = '`+producto.nombre+`',
  PRO_PRECIO = '`+producto.precio+`',
  PRO_STOCK = `+producto.stock+`,
  PRO_CAT_ID = `+producto.categoria+`
  WHERE PRO_ID = `+producto.id;
}


module.exports.crearProductos = crearProductos;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarProducto = actualizarProducto;



