const express = require('express');
//Importamos el archivo de rutas
const routes = require('./routes')
//path lee los archivos que tines en el sistema
const path = require('path')
//helpeers con meytodos de ayuda general 
const helpers = require('./helpers')


//crando conexion a la base de dtaos
const db = require('./config/db')
//con authenticate solo se verificara si la conexon fue correcta y con sync creamos la tabla mediante el modelo
//recuerda importar el modelo para poder crear la tabla
require('./models/Proyectos')
require('./models/Tareas')
db.sync()
    .then(()=>{console.log('conectado al server')})
    .catch(error => {console.log(error)})

    
//creando app de express
const app = express();


//Habilitar datos de body
app.use(express.json())
app.use(express.urlencoded({extended: true  }));

//agregamos la carpeta donde cargara los archivos estaticos (css,js)
app.use(express.static('public'))

//Habilitamos el view enginne en express PUG()
app.set('view engine', 'pug')
//agregamos la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'))

//Pasar el var dump para qeu este disponible en toda la aplicaicon , esto es un middelware

 app.use((req, res, next) => {
     res.locals.year = new Date();
    res.locals.vardump = helpers.vardump;
    next();
})




//Asi utilizamos las rutas que separamos al otro archivo
app.use('/',routes());

//Puerto para que corra el servidor de express
app.listen(3000);


