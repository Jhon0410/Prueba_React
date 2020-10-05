let obtenerTodos = function () {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.productos.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/producto.model');
        var sql_todos = queries.todos();
        conexion.db.all(sql_todos, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: [] });
            } else {
                if (rows) {
                    var arrProducto = [];
                    rows.forEach(row => {
                        arrProducto.push(model.productoModel(row));
                    });
                    resolve({ success: true, data: arrProducto });
                } else {
                    resolve({ success: true, data: [] });
                }
            }
        });
    });
}

let crearproducto = function (producto) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.productos.database');
        const conexion = require('../database/conection.database');
        var sql_insert = queries.crearProductos(producto);
        conexion.db.run(sql_insert, err => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                console.log('Producto creado con exito');
                resolve(true);
            }
        });
    });
};

let obtenterId = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.productos.database');
        const conexion = require('../database/conection.database');
        const model = require('../model/producto.model');
        var sql_porId = queries.obtenterPorId(id);
        conexion.db.get(sql_porId, (err, row) => {
            if (err) {
                console.log(err.message);
                resolve({ success: false, data: "" });
            } else {
                if (row) {
                    console.log('El producto  consulatado');
                    resolve({ success: true, data: model.productoModel(row) });
                } else {
                    resolve({ success: true, data: null });
                }
            }
        });
    });
}

let eliminarid = function (id) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.productos.database');
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

let actualizar = function (producto) {
    return new Promise(function (resolve, reject) {
        const queries = require('../database/queries.productos.database');
        const conexion = require('../database/conection.database');
        var sql_actualizar = queries.actualizarProducto(producto);
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
exports.crearproducto = crearproducto;