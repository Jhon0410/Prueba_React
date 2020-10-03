let obtenerTodos = function () {
    return new Promise(function(resolve, reject){
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        var sql_todos = queries.todos();
        conexion.db.all(sql_todos,[], (err, rows) => {
            if (err) {
                console.log(err.message);
                resolve({success:false, data:[]});
            } else {
                resolve({success:true, data:rows});
            }
        });
    });
}

let crearUsario = function (usuario) {
    return new Promise(function(resolve, reject){
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        var sql_insert = queries.crearUsuario(usuario);
        conexion.db.run(sql_insert, err => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                console.log('creado con exito');
                resolve(true);
            }
        });
    });
};

let obtenterPorId = function (id) {
    return new Promise(function(resolve, reject){
        const queries = require('../database/queries.usuario.database');
        const conexion = require('../database/conection.database');
        var sql_porId = queries.obtenterPorId(id);
        conexion.db.get(sql_porId, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({success:false, data:""});
            } else {
                console.log('El usuario fue consulatado');
                resolve({success:true, data:row});
            }
        });
    });
}

let eliminarPorid = function (id) {
    return new Promise(function(resolve, reject){
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

let actualizarPorId = function (id) {
    var usuarioup = {
        id: id,
        name: 'edwar'
    };
    return usuarioup;
}

exports.todos = obtenerTodos;
exports.obtenterPorId = obtenterPorId;
exports.eliminarPorid = eliminarPorid;
exports.actualizarPorId = actualizarPorId;
exports.crearUsario = crearUsario;