const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const vaultRoutes = require('./routes/vaultsRoutes')
const cookieParser = require('cookie-parser')
let PORT = process.env.PORT;

//cors setup
app.use(cors({
    origin : 'http://localhost:5173' ,
    credentials :true
}))


//middleware for parsing jsons
app.use(express.json())

app.use(cookieParser())

//Connecting database..(mongoose)
const dbConnection = require("./config/dbConnection")

app.use("/user" , userRoutes);
app.use('/vault' , vaultRoutes)

app.listen(PORT , (req,res) =>{
    console.log(`Server Started.. on port http://localhost:${PORT}`)
})

