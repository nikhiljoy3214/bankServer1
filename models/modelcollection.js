// TO IMPORET MONGOOSE
const mongoose=require('mongoose')

// CREATE MODEL FOR COLLECTIONS 

// SCHEMEA FIELDS AND VALUES OF COLLECTION

// USERES
const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]

})

// TO EXPORT MODEL
module.exports=users