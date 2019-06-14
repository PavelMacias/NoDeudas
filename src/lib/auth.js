const helpers = require('./helpers');
module.exports = {
    /*Añ nosoitros intentar resivir los datos del usuario,  passport esta 
    poblando con diferentes metodos aqui se usa el metodo isAuthenticated 
    este metodo comprueba si la sesion existe retorna */
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next(); //si la sesion existe adelante con el siguiente codigo
        }else{
            return res.redirect('/login');
        }
    },
    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/inicio')
        }
    },
    userAdmin(user,res,next){
        if(helpers.userType(user)){
            return next()
        }else{
            return res.send("fallo")
        }
    }

}