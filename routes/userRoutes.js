const router = require('express').Router()
const {addUser , loginUser , getUserById ,
 updateProfile , allUsers , logoutAction , forgotPassword , resetPassword} = require("../controllers/userController")

router.get("/" , (req ,res) =>{
    res.send("Hello from server..")
})

router.get('/users' , allUsers)

router.post("/signup" , addUser); 

router.post("/login" , loginUser);

router.get("/getuserbyid/:id" , getUserById);

router.patch('/profile/:id' , updateProfile);

router.get('/logout' , logoutAction);

router.post('/forgotpass' , forgotPassword);

router.post('/resetpass/:token' , resetPassword);

module.exports = router;