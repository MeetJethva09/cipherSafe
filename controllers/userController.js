const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const moment = require('moment-timezone')
const {tokenGeneration , tokenExchange , verifyExcahangeToken} = require("../utils/tokenGenerate")
const {sendingMail} = require('../utils/mailService')

const allUsers = async(req , res) =>{
    try{
        const allUserss = await userModel.find()
        res.status(200).json({
            message : "fetch",
            data : allUserss
        })
    }
    catch(err)
    {
        console.log('error occured while get users')
    }
}


const addUser =  async (req , res) =>{
    try{
        const psw = req.body.password;
        const cpsw = req.body.confirmPassword;
        if(psw != cpsw)
        {
            res.status(401).json({
                message : "Password doesn't match.."
            })
        }
        else
        {
            //Password hashing
            const hashPassword = bcrypt.hashSync(req.body.password , 10)
            req.body.password = hashPassword

            //confirm password hashing
            const chashPassword = bcrypt.hashSync(req.body.confirmPassword , 10);
            req.body.confirmPassword = chashPassword;

            const addUser = await userModel.create(req.body);
            res.status(201).json({
                message : 'Signup done',
                data : addUser
            })
        }
    }
    catch(err){
        console.log('error occured while signup..' , err);
    }
}

const loginUser = async (req , res) =>{
    try{
        let {email} = req.body;
        const findUser = await userModel.findOne({email});
        if(!findUser)
        {
            res.status(404).json({
                message : "Please First signup!!"
            })
        }
        else
        {
            const isMatch = await bcrypt.compare(req.body.password , findUser.password);
            if(isMatch === true)
            {   
                const token = tokenGeneration(findUser);
                res.cookie('token' , token);
                let date = moment().tz('Asia/Kolkata').toDate()
                findUser.lastLogin = date;
                await findUser.save()
                res.status(200).json({
                    message : "Login successfull..",
                    token : token,
                    data : findUser
                })
            }
            else
            {
                res.status(401).json({
                    message : "Invalid Credentials!!"
                })
            }
        }
    }
    catch(err){
        console.log('error occured while login user!!!' , err)
    }
}

const getUserById = async (req , res) =>{
    try{
        const getUser = await userModel.findOne({_id : req.params.id});
        if(!getUser)  res.status(500).json({message : "internel server error"})
        else
        {
            res.status(200).json({
                message: "user fetch",
                data : getUser
            })
        }
    }
    catch(err){
        console.log("error occured while getting user.." , err)
    }   
}

const updateProfile = async (req , res) =>{
    try{
        const {username , email} = req.body;
        const updateUser = await userModel.updateOne({_id : req.params.id} , {$set : {
            username : username ,
            email : email,
            updatedAt : new Date()
        }})
        res.status(200).json({
            message : "data updation",
            data : updateUser
        })
    }
    catch(err)
    {
        console.log('Error occured while updation' , err);
    }
}

const logoutAction = (req , res) =>{
     res.clearCookie('token');
     res.status(200).json({
        message : "logout"
     })
}

const forgotPassword = async (req , res) =>{
    const {email} = req.body;
    const getUserByEmail = await userModel.findOne({email});
    if(!getUserByEmail) {
        res.status(404).json({
            message : "Invalid Email address.."
        })
    }
    else
    {
        let resetToken = tokenExchange(getUserByEmail);
        res.cookie('resetPassToken' , resetToken);
        res.status(200).json({
            message : "Verify",
            resetPassToken : resetToken
        })
    }
}

const resetPassword = async (req , res) =>{
    try{
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        if(password != confirmPassword)
        {
            res.status(403).json({
                message : "Password doesn't match!!"
            })
        }
        else
        {
            //Update the mew password..
            const verifyToken = verifyExcahangeToken(req.params.token)
            const userByToken = await userModel.findOne({email : verifyToken.email})
            if(!userByToken)
            {
                res.status(404).json({
                    message : "Unauthorize due to verify token"
                })
            }
            else
            {
                     //Update new password with hashing
                    const hashPassword = await bcrypt.hash(password , 10);

                     //update confirm password with hashing
                    const hashConfirmPassword = await bcrypt.hash(confirmPassword , 10);

                    password = hashPassword;
                    confirmPassword = hashConfirmPassword;

                    const updateData = await userModel.updateOne({email : verifyToken.email} , {
                        $set : {
                            password : password,
                            confirmPassword : confirmPassword
                        }
                    })
                    res.status(200).json({
                        message : "Changes Success!!",
                    })
                
            }
        }
    }
    catch(err)
    {
        console.log('Error occured while reset the password' , err)
    }
}


module.exports = {
    addUser,
    loginUser,
    getUserById,
    updateProfile,
    allUsers,
    logoutAction,
    forgotPassword,
    resetPassword
}