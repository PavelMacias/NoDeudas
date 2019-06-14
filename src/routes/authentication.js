const express = require("express");
const router = express.Router();
const passport = require('passport');
const pool = require('../database')
const {isLoggedIn,isNotLoggedIn,userAdmin} = require('../lib/auth');
//routes GET to authenticate 
//GET login
router.get('/login',isNotLoggedIn,(req,res)=>{
    res.render('auth/login');
});
//Get logout
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login')
})
//GET add user
router.get('/agregar_usuario',isLoggedIn,userAdmin,(req,res) =>{
    res.render('auth/agregar_usuario')
});

/*------------------------------------------------------------------------------------- */
//routes to POST for authentication
//POST login
router.post('/login',(req,res,next)=>{
    passport.authenticate('local.login',{
        successRedirect: '/inicio',
        failureRedirect:'/inicio',
        failureFlash:true
    })(req,res,next);

});

//POST Add user
router.post('/agregar_usuario',passport.authenticate('local.adduser',{ //en este objeto se define a donde se dirigira si falla o si todo es correcto
        succesRedirect:'/agregar_usuario',
        failureRedirect: '/agregar_usuario',
        successFlash:true,
        failureFlash: true
    })
    
);

module.exports = router;