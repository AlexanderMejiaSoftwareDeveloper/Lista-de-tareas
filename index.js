const express = require('express');
//Importamos el archivo de rutas
const routes = require('./routes')
//path lee los archivos que tines en el sistema
const path = require('path')
//helpeers con meytodos de ayuda general 
const helpers = require('./helpers')
//importar libreria de alertas
const flash = require('connect-flash')
//importamos passport
const passport = require('./config/passport')

const session = require('express-session')
const cookieParser = require('cookie-parser')

//crando conexion a la base de dtaos
const db = require('./config/db')
//con authenticate solo se verificara si la conexon fue correcta y con sync creamos la tabla mediante el modelo
//recuerda importar el modelo para poder crear la tabla
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')
db.sync()
    .then(()=>{console.log('conectado al server')})
    .catch(error => {console.log(error)})

    
//creando app de express
const app = express();

//agregamos la carpeta donde cargara los archivos estaticos (css,js)
app.use(express.static('public'))

//Habilitamos el view enginne en express PUG()
app.set('view engine', 'pug')


//Habilitar datos de body
app.use(express.json())
app.use(express.urlencoded({extended: true  }));


//agregamos la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'))

//agregamos flash menssages
app.use(flash())

app.use(cookieParser());

//sesiones npos permite navegar entre distitas paginas sin la necesidad de autenticarse de nuevok
app.use(session({
    secret:'supersecreto',
    resave:false,
    saveUninitialized:false //lo que hace esto es que mantiene la sesion activa aaunque el usuairo no este haviendo nada
}))

app.use(passport.initialize());
app.use(passport.session())

//Pasar el var dump para qeu este disponible en toda la aplicaicon , esto es un middelware
 app.use((req, res, next) => {
     res.locals.year = new Date();
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
})




//Asi utilizamos las rutas que separamos al otro archivo
app.use('/',routes());

//Puerto para que corra el servidor de express
app.listen(3000);


