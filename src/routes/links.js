const express = require("express");
const router = express.Router();
const {isLoggedIn,userAdmin,userDebtor} = require('../lib/auth');

const pool = require('../database');
//---------get routes-----
//---------rutas principales-----
router.get('/registrar_pago',isLoggedIn, userAdmin, async (req,res) =>{
    const links = await pool.query('SELECT fld_id FROM tbl_debtor');
    res.render('links/registrar_pago', {links})
});
router.get('/realizar_cobro',isLoggedIn,  userAdmin,async (req,res) =>{
    const links = await pool.query('SELECT fld_id FROM tbl_debtor');
    res.render('links/realizar_cobro',{links})
});
router.get('/inicio', isLoggedIn, userAdmin, async(req,res) =>{
    const links = await pool.query('SELECT* FROM tbl_debtor ORDER BY fld_deb DESC');
    res.render('links/inicio',{links});
});
router.get('/usuario',isLoggedIn,userDebtor,async(req,res)=>{
    const links = await pool.query('SELECT* FROM tbl_repository WHERE fld_id_debtor = ?',[req.user.fld_id]);
    
     for(let i = 0; i < links.length; i++){
        if(links[i].fld_tipe == 1){
            links[i].fld_tipe = "Cobro";
        }else{
            links[i].fld_tipe = "Pago";
        }
 
    }
    const amout = await pool.query('SELECT fld_deb FROM tbl_debtor WHERE fld_id = ?',[req.user.fld_id]);
    const total = amout[0].fld_deb
    const send = {links,total}
    
    res.render('links/usuario',{send});
    
});
//---------/rutas principales-----

//---------Post routes-----
router.post('/registrar_pago', async(req,res) =>{
    const{fld_id_debtor,fld_amout} = req.body;
    const newLink ={
        fld_id_creditor: req.user.fld_id,
        fld_id_debtor,
        fld_amout,
        fld_date: 'now()',
        fld_tipe: 0
    }
    await pool.query('INSERT INTO tbl_repository set ?', [newLink]);
    req.flash('success','Se agregó un pago de: ', newLink.fld_amout,'del usuario ID: ',fld_id_debtor);
    res.redirect('/registrar_pago');
});

router.post('/realizar_cobro', async(req,res) =>{
    const {fld_id_debtor, fld_amout} = req.body;

    if(fld_id_debtor == "all"){
        const allUsers = await pool.query('SELECT* FROM tbl_debtor WHERE fld_id_creditor = ?',[req.user.fld_id]);
        const number = await pool.query('SELECT COUNT(fld_id) AS n FROM tbl_debtor WHERE fld_id_creditor = ?',[req.user.fld_id]);
        const y = number[0].n;
        for(let i = 0 ; i< y; i++){
            const all = {
            
                fld_id_creditor: req.user.fld_id,
                fld_id_debtor: allUsers[i].fld_id,
                fld_amout,
                fld_date: 'NOW()',
                fld_tipe: 1
            }
            await pool.query('INSERT INTO tbl_repository set ?', [all]);
            
        }
        req.flash('success','Se ha cobrado $' + fld_amout + " a todos los deudores");
        
    }else{
         const  newLink ={
            fld_id_creditor: req.user.fld_id,
            fld_id_debtor,
            fld_amout,
            fld_date: '2019-08-11',
            fld_tipe: 1
        } 
        await pool.query('INSERT INTO tbl_repository set ?', [newLink]);  
        req.flash('success','Se ha cobrado $' + fld_amout + " al deudor");
    }
    res.redirect('/realizar_cobro'); 
});

module.exports = router;