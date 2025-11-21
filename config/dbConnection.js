const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connectivity success");
})
.catch((err)=>{
    console.log("Error occured while connecting database..")
})

module.exports = mongoose.connection;