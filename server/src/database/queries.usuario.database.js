const crearUsuario = function(usuario){
    return `INSERT INTO USUARIO (USU_NOMBRE,USU_CORREO,USU_TELEFONO,USU_PASSWORD, USU_ROL)
     VALUES (
        '`+usuario.nombre+`',
        '`+usuario.correo+`',
        '`+usuario.telefono+`',
        '`+usuario.password+`',
        'USUARIO'
      ); `;
}

const crearUsuarioAdmin = function(){
  return `INSERT INTO USUARIO (USU_ID,USU_NOMBRE,USU_CORREO,USU_TELEFONO,USU_PASSWORD, USU_ROL)
   VALUES (0,
    'Administrador',
    'admin@test.com',
    '1000000000',
    '12345678',
    'ADMIN'
    ); `;
}

const todos = function(){
  return `SELECT USU.*, COUNT(CAT.CAT_ID) AS CATEGORIAS FROM USUARIO USU
  LEFT OUTER JOIN CATEGORIA CAT ON USU.USU_ID = CAT.CAT_USU
  WHERE USU_ROL <> 'ADMIN' GROUP BY USU.USU_ID `;
}

const obtenterPorId = function(id){
  return `SELECT * FROM USUARIO WHERE USU_ID = `+id;
}

const eliminarPorId = function(id){
  return `DELETE FROM USUARIO WHERE USU_ID = `+id;
}

const actualizarUsuario = function(usuario){
  return `UPDATE USUARIO SET 
  USU_NOMBRE = '`+usuario.nombre+`',
  USU_TELEFONO = '`+usuario.telefono+`'
  WHERE USU_ID = `+usuario.id;
}

const login = function(correo){
  return `SELECT * FROM USUARIO WHERE USU_CORREO = '`+ correo + `'`;
}



module.exports.crearUsuario = crearUsuario;
module.exports.crearUsuarioAdmin = crearUsuarioAdmin;
module.exports.todos = todos;
module.exports.obtenterPorId = obtenterPorId;
module.exports.eliminarPorId = eliminarPorId;
module.exports.actualizarUsuario = actualizarUsuario;
module.exports.login = login;



