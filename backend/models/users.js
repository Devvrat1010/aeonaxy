const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:String,
    username:String,
    email:String,
    password:String,
    image:String
})

module.exports=mongoose.model('User',userSchema)