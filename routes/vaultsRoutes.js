const router = require('express').Router()
const {addVault , getVaultById , getVaultByVaultId , deleteVaultById , editVault} = require('../controllers/vaultController')

router.post('/addvault' , addVault);

router.get('/getvaultbyid/:uid' , getVaultById);

router.get('/vaultbyvid/:vid' , getVaultByVaultId);

router.delete('/deletebyid/:vid' , deleteVaultById);

router.put('/vaultedit/:vid' , editVault);

module.exports = router;