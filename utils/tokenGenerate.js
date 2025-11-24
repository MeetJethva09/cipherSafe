const jwt = require('jsonwebtoken')

const tokenGeneration =  (user) =>{
    const payload = {
        username : user.username,
        email : user.email,
    }

    const token = jwt.sign(payload , process.env.JWT_SECRET);
    return token;
}

const tokenExchange = (user) =>{
    const passPayLoad = {
        email : user.email,
        phoneNumber : user.phoneNumber,
        _id : user._id,
        otp : user.otp
    }
    const tokenPass = jwt.sign(passPayLoad , process.env.JWT_PASS_SECRET);
    return tokenPass;
}   

const verifyExcahangeToken = (tokenPass) =>{
    const verifyToken = jwt.verify(tokenPass , process.env.JWT_PASS_SECRET);
    return verifyToken;
}

module.exports = {
    tokenGeneration,
    tokenExchange,
    verifyExcahangeToken
}