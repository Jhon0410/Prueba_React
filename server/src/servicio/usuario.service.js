let obtenerTodos = function () {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/usuario.model');
        var sql_todos = queries.todos();
        conexion.db.all(sql_todos, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: [] });
            } else {
                if (rows) {
                    var arrUsuarios = [];
                    rows.forEach(row => {
                        arrUsuarios.push(model.usuarioModel(row));
                    });
                    resolve({ success: true, data: arrUsuarios });
                } else {
                    resolve({ success: true, data: [] });
                }
            }
        });
    });
}

let crearUsario = function (usuario) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        
        var sql_usuario = queries.login(usuario.correo);
        conexion.db.get(sql_usuario, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, msg: "Hubo un error al ejecutar la crecion del usuario, por favor consulte al administrador" });
            } else {
                if (row) {
                    //el usuario existe 
                    resolve({ success: false, msg: "El usario ya existe" });
                } else {
                    var sql_insert = queries.crearUsuario(usuario);
                    conexion.db.run(sql_insert, err => {
                        if (err) {
                            console.log(err.message);
                            resolve({ success: false, msg: "Ocurrio un error al crear el usuario" });
                        } else {
                            console.log('creado con exito');
                            resolve({ success: true, msg: "El usario fue creado exitosamente" });
                        }
                    });
                }

            }
        });

    });
};

let crearUsarioAdmin = function () {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        
        var sql_usuario = queries.obtenterPorId(0);
        conexion.db.get(sql_usuario, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                if (row) {
                    resolve(true);
                } else {
                    var sql_insert = queries.crearUsuarioAdmin();
                    conexion.db.run(sql_insert, err => {
                        if (err) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                }

            }
        });

    });
};

let obtenterPorId = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/usuario.model');
        var sql_porId = queries.obtenterPorId(id);
        conexion.db.get(sql_porId, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: "" });
            } else {
                if (row) {
                    console.log('El usuario fue consulatado');
                    resolve({ success: true, data: model.usuarioModel(row) });
                } else {
                    resolve({ success: true, data: null });
                }
            }
        });
    });
}

let loginusuario = function (login) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/usuario.model');
        var sql_usuario = queries.login(login.correo);
        conexion.db.get(sql_usuario, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: "Hubo un error al ejecutar el login, por favor consulte al administrador" });
            } else {
                if (row) {
                    //el usario existe
                    if (login.password === row.USU_PASSWORD) {
                        resolve({ success: true, data: model.usuarioModel(row) });
                    } else {
                        resolve({ success: false, data: "El usuario o la cantraseña no coinciden" });
                    }
                } else {
                    //el usario no exite
                    resolve({ success: false, data: "El usario no se encuentra registrado" });
                }

            }
        });
    });
}



let eliminarPorid = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        var sql_eliminarPorId = queries.eliminarPorId(id);
        conexion.db.run(sql_eliminarPorId, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

let actualizar = function (usuario) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        var sql_actualizar = queries.actualizarUsuario(usuario);
        conexion.db.run(sql_actualizar, err => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                console.log('creado con exito');
                resolve(true);
            }
        });
    });

}

exports.todos = obtenerTodos;
exports.obtenterPorId = obtenterPorId;
exports.eliminarPorid = eliminarPorid;
exports.actualizar = actualizar;
exports.crearUsario = crearUsario;
exports.loginusuario = loginusuario;
exports.crearUsarioAdmin = crearUsarioAdmin;
