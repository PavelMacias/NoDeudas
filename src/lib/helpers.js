const bcrypt = require('bcrypt');

const helpers = {};

helpers.encryptPassword = async (password)=>{
    console.log(password)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

helpers.matchPassword = async (password,savedPassword) =>{
    console.log(password);
    console.log(savedPassword)
    console.log(await bcrypt.compare(password,savedPassword));
    try{
        return await bcrypt.compare(password,savedPassword);
    } catch(e){
        console.log(e)
    }  

}
helpers.userType = (u)=>{
    let size = 0, key;
    for (key in u.user) {
        if (u.user.hasOwnProperty(key)) size++;
    }
    if(size == 5){
        return true
    }else{
        return false
    }
    
}

module.exports = helpers;