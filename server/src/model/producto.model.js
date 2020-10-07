const productoModel = function (producto) {
    let productoModel = {
        id: producto.PRO_ID,
        nombre: producto.PRO_NOMBRE,
        precio: producto.PRO_PRECIO,
        stock: producto.PRO_STOCK,
        categoriaid: producto.PRO_CAT_ID
        
        
    };
    return productoModel;
}
module.exports.productoModel = productoModel;


