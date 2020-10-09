const crearProductos = function (producto) {
  return `INSERT INTO PRODUCTO (PRO_NOMBRE, PRO_PRECIO, PRO_STOCK, PRO_CAT_ID)
     VALUES (
        '`+ producto.nombre + `',
        '`+ producto.precio + `',
        '`+ producto.stock + `',
        `+ producto.categoria + `             
      ); `;
}

const todos = function (id) {
  return `SELECT PRO.*, CAT.CAT_NOMBRE as CATE FROM PRODUCTO PRO
  INNER JOIN CATEGORIA CAT ON CAT.CAT_ID = PRO.PRO_CAT_ID
  INNER JOIN USUARIO USU ON USU.USU_ID = CAT.CAT_USU
  WHERE USU.USU_ID = ` + id;
}

const obtenterPorId = function (id) {
  return `SELECT * FROM PRODUCTO WHERE PRO_ID = ` + id;
}

const eliminarPorId = function (id) {
  return `DELETE FROM PRODUCTO WHERE PRO_ID = ` + id;
}

const actualizarProducto = function (producto) {
  return `UPDATE PRODUCTO SET
  PRO_NOMBRE = '`+ producto.nombre + `',
  PRO_PRECIO = '`+ producto.precio + `',
  PRO_STOCK = `+ producto.stock + `,
  PRO_CAT_ID = `+ producto.categoria + `
  WHERE PRO_ID = `+ producto.id;
}


module.exports.crearProductos = crearProductos;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarProducto = actualizarProducto;



