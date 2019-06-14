const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session'); //este modulo es para almacenar la session en mysql
const { database } = require('./keys');
const passport = require('passport');
//Hasta qui solo llamo las dependencias

//initializations
const app = express();
require('./lib/passport')

//Settings
app.set('port', 4000); //fijo el puerto por que se enlasara la app
//Fijo la ruta de views con app.set(nombre de la carpeta, y la ruta combinada
// con path.join(__dirnmae(Const que regresa la ruta actual, 'npmbre de otra carpeta a fusionar') ))
app.set('views', path.join(__dirname, 'views'));
//agregamos las rutas:
app.engine('.hbs', exphbs({ //usando esta funcion
    defaultLayout: "main", //nombre del layout
    layoutsDir: path.join(app.get('views'), 'layouts'), //ruta del archivo
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //extencion de los archivos
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs'); //arranca

//middlewares
//crear la secion para almacenar los datos
app.use(session({
    secret: "appwithsqlsession",
    resave: false, //para que no se comience a renovar la session
    saveUninitialized: false,//para que no se vuela a guardar la session
    store: new MySQLStore(database)//con esto guarda la session en la memoria de sql no del server
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // hace que solo admita tipos de archivos normales
app.use(express.json());// permite resivir archivos tipo json
app.use(passport.initialize());//aqui se inicia passport pero hay que crear una session
app.use(passport.session());//aqui se crea la session para que passport funcione


//Glovales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/', require('./routes/links'));
//MAS RUTAS a liks se le agrega el prefijo /links para facilitar su posterior uso 

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), () => {
    console.log("Console on port: " + app.get('port'));

})