const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:String,
    username:String,
    email:String,
    password:String,
    avatar:String,
    location:String,
    survey:Array
})

module.exports=mongoose.model('User',userSchema)