//en este archivo se configurara el modulo passport que trabaja junto a session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//para elegir el tipo de autenticacion
const pool = require('../database');
const helpers = require('./helpers');

//Con use se puede elegir la autenticacion
passport.use('local.login',new LocalStrategy({
    usernameField: 'fld_id',
    passwordField: 'fld_password',
    passReqToCallback: true
},  async (req,fld_id,fld_password,done) =>{
    let rows = await pool.query('SELECT* FROM tbl_creditor WHERE fld_id = ?',[fld_id]);
    if(rows.length==0){
        rows = await pool.query('SELECT* FROM tbl_debtor WHERE fld_id = ?',[fld_id]);
        console.log(rows);
    }
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(fld_password,user.fld_passWord);
        if(validPassword){
            done(null,user,req.flash('success','Bien venido '  + user.fld_name));
        }else
        done(null,false,req.flash('error','Contraseña incorrecta'));
    }else{
        done(null,false,req.flash('error','Usuario no encontrado'));
    }
}));


passport.use('local.adduser', new LocalStrategy({
    usernameField: 'fld_id',
    passwordField: 'fld_password',
    passReqToCallback: true //aqui se define que habra mas campos solo username y password
},  async (req, fld_id, fld_password, done) => { //en esta parte se definira que va hacer al autenticar al nuevo usuario 
    //"done" se utilizara al final ya que es para los demas campos
    console.log(fld_id);
    const { fld_name, fld_lastname, fld_email, fld_borndate, Rpassword } = req.body;
    const newUser = {
        fld_id,
        fld_name,
        fld_lastname,
        fld_email,
        fld_borndate,
        fld_password,
        fld_id_creditor: '55555'/* req.user.fld_id */,
        fld_deb: 0
    };
    newUser.fld_password = await helpers.encryptPassword(newUser.fld_password)
    
    result = await pool.query('INSERT INTO tbl_debtor set ?',[newUser]);
    return done(null);
}));

passport.serializeUser((user,done)=>{ //para guardar el usuario a la sesion 
    done(null,user.fld_id);
});

passport.deserializeUser(async(fld_id,done)=>{
    
    let rows = await pool.query('SELECT* FROM tbl_creditor WHERE fld_id = ?',[fld_id]);
    if(rows.length == 0){
         rows = await pool.query('SELECT* FROM tbl_debtor WHERE fld_id = ?',[fld_id])
    }
    done(null,rows[0]);
});