const express = require("express");
const router = express.Router();

const pool = require('../database');
//---------get routes-----
router.get('/registrar_pago',(req,res) =>{
    res.render('links/registrar_pago')
});
router.get('/hacer_pago',(req,res) =>{
    res.render('links/hacer_pago')
});

router.post('/generar_pago',(req,res) =>{
    res.send.apply("Resivido")
})

module.exports = router;