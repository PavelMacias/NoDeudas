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
router.post('/agregar_usuario', async (req,res) =>{
    const {fld_name, fld_lastname, fld_email, fld_borndate, fld_tel,fld_password, Rpassword} =  req.body;
    const newLink = {
        fld_name,
        fld_lastname, 
        fld_tel,
        fld_email,
        fld_borndate,
        fld_password, 
        fld_id_creditor: '1'
    };
    await pool.query('INSERT INTO tbl_debtor set ?',[newLink]);  
    res.send("NICE")
});
router.get('/links', async (req,res) =>{
    const links = await pool.query('SELECT* FROM tbl_debtor');
    console.log(links);
    res.render('links/list',{links});
});

module.exports = router;