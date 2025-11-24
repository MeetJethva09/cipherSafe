const vaultSchema = require('../models/userVault')
const crypto = require('crypto-js')

const addVault = async (req , res) =>{
    try{
        let password = req.body.password;

        //Encryption of vault password..
        const cipherText = crypto.AES.encrypt(password , process.env.CRYPTO_SECRET_KEY).toString();
        req.body.password = cipherText;

        const addedVault = await vaultSchema.create(req.body);
        res.status(201).json({
            message : 'vault added',
            data : addedVault
        })
    }
    catch(err)
    {
        console.log('Error ocuured while aading vault..' , err)
    }
  
}   

const getVaultById = async (req , res ) =>{
    try{
        const vaultById = await vaultSchema.find({userId : req.params.uid})
        res.status(200).json({
            message : "fetched..",
            data : vaultById
        })
    }
    catch(err)
    {
        console.log('Error occure while find vault by id' , err)
    }
}

const getVaultByVaultId = async (req , res) =>{
    try{
        const vaultByvId = await vaultSchema.findOne({_id : req.params.vid});

        //Decryption of vault password..
        const plainText = crypto.AES.decrypt(vaultByvId.password , process.env.CRYPTO_SECRET_KEY);
        const originalText = plainText.toString(crypto.enc.Utf8);
        vaultByvId.password = originalText;
    
        res.status(200).json({
            message : "vailt find by vaultid",
            data : vaultByvId
        }) 
    }
    catch(err)
    {
        console.log('Error occured while getvaulbyvid' , err);
    }
}

const deleteVaultById = async (req , res) =>{
    try{
        const delteVault = await vaultSchema.findByIdAndDelete(req.params.vid);
        res.status(200).json({
            message : "deleted"
        })
    }
    catch(err)
    {
        console.log('Error occured while deltevault' ,err);
    }
}

const editVault = async (req , res) =>{
    try{
        const {vaultName , username , category , notes } = req.body;
        const editedVault = await vaultSchema.updateOne({_id : req.params.vid} , {
            $set : {
                vaultName, 
                username,
                category,
                notes
            }
        })
        res.status(200).json({
            message : "edit success",
            data : editedVault
        })
    }
    catch(err)
    {
        console.log('Erro occured while updating vault', err);
    }
}



module.exports = {
    addVault,
    getVaultById,
    getVaultByVaultId,
    deleteVaultById,
    editVault
}