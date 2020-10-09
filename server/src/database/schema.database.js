const sql_create_usuario = `CREATE TABLE IF NOT EXISTS "USUARIO" (
	"USU_ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"USU_NOMBRE"	TEXT NOT NULL,
	"USU_CORREO"	TEXT NOT NULL,
	"USU_TELEFONO"	TEXT NOT NULL,
	"USU_PASSWORD"	TEXT NOT NULL,
	"USU_ROL" TEXT NOT NULL
);`;

const sql_create_categoria = `CREATE TABLE IF NOT EXISTS "CATEGORIA" (
	"CAT_ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"CAT_CODIGO"	TEXT NOT NULL,
	"CAT_NOMBRE"	TEXT NOT NULL,
	"CAT_USU"	INTEGER NOT NULL,
  	FOREIGN KEY ("CAT_USU")
  	REFERENCES "USUARIO" ("USU_ID")
);`;

const sql_create_producto = `CREATE TABLE IF NOT EXISTS "PRODUCTO" (
	"PRO_ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"PRO_NOMBRE"	TEXT NOT NULL,
	"PRO_PRECIO"	REAL NOT NULL,
	"PRO_STOCK"	INTEGER NOT NULL,
  	"PRO_CAT_ID"	INTEGER NOT NULL,
  FOREIGN KEY ("PRO_CAT_ID")
  	REFERENCES "CATEGORIA" ("CAT_ID")
);`;

let creardb = function () {
	const usuarioService = require('../servicio/usuario.service');
	const conection = require('./conection.database');
	conection.db.run(sql_create_usuario, err => {
		if (err) {
			return console.error(err.message);
		}
		
		conection.db.run(sql_create_categoria, err => {
			if (err) {
				return console.error(err.message);
			}
			
			conection.db.run(sql_create_producto, err => {
				if (err) {
					return console.error(err.message);
				}
				usuarioService.crearUsarioAdmin();
			});
		});
	});

}
module.exports.creardb = creardb;