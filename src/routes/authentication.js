const express = require("express");
const router = express.Router();

router.get('/login',(req,res)=>{
    res.render('auth/login');
});

router.post('/login',(req,res)=>{
    console.log(req.body)
    res.send("Enviado papulince");

});

module.exports = router;