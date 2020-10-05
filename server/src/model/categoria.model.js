const categoriaModel = function (categoria) {
    let categoriaModel = {
        id: categoria.CAT_ID,
        nombre: categoria.CAT_NOMBRE,
        catUsuario: categoria.CAT_USU,
        
    };
    return categoriaModel;
}
module.exports.categoriaModel = categoriaModel;