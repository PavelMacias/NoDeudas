const express = require("express");
const router = express.Router();

const pool = require('../database');
//---------get routes-----
router.get('/registrar_pago',(req,res) =>{
    res.render('links/registrar_pago')
});
router.get('/realizar_cobro',(req,res) =>{
    res.render('links/realizar_cobro')
});
router.get('/agregar_usuario',(req,res) =>{
    res.render('links/agregar_usuario')
});

//---------Post routes-----
router.post('/generar_pago',(req,res) =>{
    res.send.apply("Resivido")
});

router.post('/realizar_cobro',(req,res) =>{
    res.send.apply("resivido")
});
router.post('/agregar_usuario',(req,res) =>{
    const {fld_name, fld_lasname, fld_email, fld_borndate, fld_sex, fld_password, Rpassword} =  req.body;
    const newLink = {
        fld_name,
        fld_lasname, 
        fld_email,
        fld_borndate,
        fld_sex,
        fld_password, 
        fld_id_creditor: '1'
    };
    pool.query('INSERT INTO tbl_debtor set ?',[newLink]);  
    console.log(newLink);
    res.send("Resived");
});

module.exports = router;