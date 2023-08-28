import jwt from 'jsonwebtoken'
require('dotenv').config();

function sign(Email){
    return jwt.sign({Email},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30m'})
}
function verify(token){
    try{
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }catch(error){
        return false;
    }
}
module.exports= {
    sign,
    verify
}