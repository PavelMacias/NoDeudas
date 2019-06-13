const express = require("express");
const router = express.Router();
const passport = require('passport');
const pool = require('../database')
//routes GET to authenticate 
//GET login
router.get('/login',(req,res)=>{
    res.render('auth/login');
});
//GET add user
router.get('/agregar_usuario',(req,res) =>{
    res.render('auth/agregar_usuario')
});

/*------------------------------------------------------------------------------------- */
//routes to POST for authentication
//POST login
router.post('/login',(req,res)=>{
    console.log(req.body)
    res.send("Enviado papulince");

});

//POST Add user
router.post('/agregar_usuario',passport.authenticate('local.adduser',{ //en este objeto se define a donde se dirigira si falla o si todo es correcto
        succesRedirect:'/inicio',
        failureRedirect: '/agregar_usuario',
        failureFlash: true
    })
    
);

module.exports = router;