const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//Hasta qui solo llamo las dependencias

//initializations
const app = express();

//Settings
app.set('port',4000); //fijo el puerto por que se enlasara la app
//Fijo la ruta de views con app.set(nombre de la carpeta, y la ruta combinada
// con path.join(__dirnmae(Const que regresa la ruta actual, 'npmbre de otra carpeta a fusionar') ))
app.set('views', path.join(__dirname,'views'));
//agregamos las rutas:
app.engine('.hbs', exphbs({ //usando esta funcion
    defaultLayout: "navbar", //nombre del layout
    layoutsDir: path.join(app.get('views'),'layouts'), //ruta del archivo
    extnames:'.hbs', //extencion de los archivos
    helpers: require('./lib/handlebars') 

}));
app.set('view engine', 'hbs'); //arranca

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // hace que solo admita tipos de archivos normales
app.use(express.json()); // permite resivir archivos tipo json

//Glovales

//Routes
app.use(require('./routes'))

//Public

//Starting server
app.listen(app.get('port'), ()=>{
    console.log("Console on port: " + app.get('port'));

})