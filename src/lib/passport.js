//en este archivo se configurara el modulo pasport que trabaja junto a session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//para elegir el tipo de autenticacion
const pool = require('../database');

//Con use se puede elegir la autenticacion
passport.use('local.adduser', new LocalStrategy({
    usernameField: 'fld_tel',
    passwordField: 'fld_password',
    passReqToCallback: true //aqui se define que habra mas campos solo username y password
},  async (req, fld_tel, fld_password, done) => { //en esta parte se definira que va hacer al autenticar al nuevo usuario 
    //"done" se utilizara al final ya que es para los demas campos
    console.log(fld_password);
    const { fld_name, fld_lastname, fld_email, fld_borndate, Rpassword } = req.body;
    console.log(fld_name, fld_lastname, fld_email, fld_borndate, Rpassword);
    const newUser = {
        fld_name,
        fld_lastname,
        fld_tel,
        fld_email,
        fld_borndate,
        fld_password,
        fld_id_creditor: '1',
        fld_deb: 0
    };
    
    await pool.query('INSERT INTO tbl_debtor set ?',[newUser]);
    console.log(newUser)
    


}));