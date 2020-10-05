let obtenerTodos = function () {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.categoria.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/categoria.model');
        var sql_todos = queries.todos();
        conexion.db.all(sql_todos, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: [] });
            } else {
                if (rows) {
                    var arrCategoria = [];
                    rows.forEach(row => {
                        arrCategoria.push(model.categoriaModel(row));
                    });
                    resolve({ success: true, data: arrCategoria });
                } else {
                    resolve({ success: true, data: [] });
                }
            }
        });
    });
}

let crearCategoria = function (categoria) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.categoria.database');
        const conexion = require('../database/conection.database');
        var sql_insert = queries.crearCategoria(categoria);
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

let obtenterId = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.categoria.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/categoria.model');
        var sql_porId = queries.obtenterPorId(id);
        console.log(sql_porId);
        conexion.db.get(sql_porId, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: "" });
            } else {
                if (row) {
                    console.log('El catalogo fue consulatado');
                    resolve({ success: true, data: model.categoriaModel(row) });
                } else {
                    resolve({ success: true, data: null });
                }
            }
        });
    });
}

let eliminarid = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.categoria.database');
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

let actualizar = function (categoria) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.categoria.database');
        const conexion = require('../database/conection.database');
        var sql_actualizar = queries.actualizarCategoria(categoria);
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
exports.obtenterPorId = obtenterId;
exports.eliminarPorid = eliminarid;
exports.actualizar = actualizar;
exports.crearCategoria = crearCategoria;