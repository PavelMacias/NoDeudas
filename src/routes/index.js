const express = require('express');
const {isNotLoggedIn} = require('../lib/auth');
const router = express.Router();

router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('../views/auth/login.hbs')
});

module.exports = router;