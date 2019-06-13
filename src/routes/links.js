const express = require("express");
const router = express.Router();

const pool = require('../database');
//---------get routes-----
//---------rutas principales-----
router.get('/login',(req,res) =>{
    
    res.render('links/login')
});
router.get('/registrar_pago',async (req,res) =>{
    const links = await pool.query('SELECT fld_id FROM tbl_debtor');
    res.render('links/registrar_pago', {links})
});
router.get('/realizar_cobro',async (req,res) =>{
    const links = await pool.query('SELECT fld_id FROM tbl_debtor');
    res.render('links/realizar_cobro',{links})
});
router.get('/agregar_usuario',(req,res) =>{
    res.render('links/agregar_usuario')
});
//---------/rutas principales-----

//---------GETS from DB-----
router.get('/inicio', async (req,res) =>{
    const links = await pool.query('SELECT* FROM tbl_debtor ORDER BY fld_deb DESC');
    res.render('links/list',{links});
});

//---------Post routes-----
router.post('/registrar_pago', async(req,res) =>{
    const{fld_id_debtor,fld_amout} = req.body;
    const newLink ={
        fld_id_creditor: 1,
        fld_id_debtor,
        fld_amout,
        fld_date: '2019-08-11',
        fld_tipe: 0
    }
    await pool.query('INSERT INTO tbl_repository set ?', [newLink]);
    req.flash('success','Pago realizado correctamente');
    res.redirect('/registrar_pago');
});

router.post('/realizar_cobro', async(req,res) =>{
    const {fld_id_debtor, fld_amout} = req.body;
    const  newLink ={
        fld_id_creditor: 1,
        fld_id_debtor,
        fld_amout,
        fld_date: '2019-08-11',
        fld_tipe: 1
    } 
    await pool.query('INSERT INTO tbl_repository set ?', [newLink]); 
    req.flash('success','Se ha cobrado ' + newLink.fld_amout + "al deudor...");
    res.redirect('/realizar_cobro');
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
        fld_id_creditor: '1',
        fld_deb: 0
    };
    await pool.query('INSERT INTO tbl_debtor set ?',[newLink]);  
    req.flash('success','Nuevo usuario creado correctamente  ; )');
    res.redirect('/agregar_usuario')
});


module.exports = router;