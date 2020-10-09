# Prueba_React
Prueba proyecto React 

Introduccion:

la aplicacion esta construida con nodejs y react.
librerias usadas:
    front: axios, bootstrap
    backend: express, sqlite.

se empleo una base de datos libianva com sqlite para evitar inconvenientes de version con mysql.


Requisitos:

- node, para esta prueba se empleo node v12.14.1
- visual studio code

conguraciones:

- el servidor de backend corre en el puerto 4000, para cambiar este modifique el archivo index de la carpeta server, linea 27.
- el servidor de cliente corre en el puerto 3000, y se conecta a el api de servicios a traves de la ruta http://localhost:4000/api/ para modificar la ruta de servicios dirijase al archivo configuración en la ruta cliente/src/settings/configuraciones.js y modifique el valor de api. 

Instrucciones:

1. descargue los fuentes del repositorio https://github.com/Jhon0410/Prueba_React.git
2. descomprima de ser necesrio y abra la carpeta Prueba-React-main con Visual studio Code
2.1 la carpe contiene dos folders correspondiente al back-end (server) y front-end (cliente) de la aplicación
3. atra vez de la consola de VS ingrese a la carpeta server con el comando cd server e instale las dependencias con el comando npm install.
4. una vez instaladas las dependencias del backend, puede inciar el back-end con el comando npm run dev
observara los siguientes mensajes de log
- El servidor está inicializado en el puerto 4000
- Successful connection to the database 'apptest.db'

5. en una nueva terminal ingrese a la carpeta client e instale las depencias con npm install.
6. una ves instaladas las dependencias proceda a correr el servidor con npm run start, con lo que la aplicación estara en linea.

Observaciones:

1. la aplicacion tiene un modo administrador, para ingresar use las credenciales admin@test.com y 12345678, en esta opcion se podran listar los usario registrados en el sistema.
2. un modo cliente para el cual se debe llenar el formulario de registro y una vez creado el usuario permite la creacion de categorías y productos.


Creditos:
- Edward Gomez
- jesandoval8@misena.edu.co