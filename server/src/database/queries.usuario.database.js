const crearUsuario = function(usuario){
    return `INSERT INTO USUARIO (USU_NOMBRE,USU_CORREO,USU_TELEFONO,USU_PASSWORD)
     VALUES (
        '`+usuario.nombre+`',
        '`+usuario.correo+`',
        '`+usuario.telefono+`',
        '`+usuario.password+`'
      ); `;
}

const todos = function(){
  return `SELECT * FROM USUARIO `;
}

const obtenterPorId = function(id){
  return `SELECT * FROM USUARIO WHERE USU_ID = `+id;
}

const eliminarPorId = function(id){
  return `DELETE FROM USUARIO WHERe USU_ID = `+id;
}

const actualizarUsuario = function(usuario){
  return `UPDATE USUARIO SET
  USU_NOMBRE = '`+usuario.nombre+`',
  USU_CORREO =  '`+usuario.correo+`',
  USU_PASSWORD = '`+usuario.password+`',
  USU_TELEFONO = '`+usuario.telefono+`'
  WHERE USU_ID = `+usuario.id;
}


module.exports.crearUsuario = crearUsuario;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarUsuario = actualizarUsuario;



