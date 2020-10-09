const usuarioModel = function (usuario) {
    let usuarioModel = {
        id: usuario.USU_ID,
        nombre: usuario.USU_NOMBRE,
        correo: usuario.USU_CORREO,
        telefono: usuario.USU_TELEFONO,
        rol:usuario.USU_ROL,
        password: usuario.USU_PASSWORD,
        totalCategorias: usuario.CATEGORIAS
    };
    return usuarioModel;
}
module.exports.usuarioModel = usuarioModel;