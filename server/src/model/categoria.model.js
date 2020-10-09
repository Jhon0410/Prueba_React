const categoriaModel = function (categoria) {
    let categoriaModel = {
        id: categoria.CAT_ID,
        codigo: categoria.CAT_CODIGO,
        nombre: categoria.CAT_NOMBRE,
        usario: categoria.CAT_USU,
        totalProductos: categoria.PRODUCTOS,
        
    };
    return categoriaModel;
}
module.exports.categoriaModel = categoriaModel;