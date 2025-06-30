const mongoose=require("mongoose");
/*for registration and login*/
const userschema=new mongoose.Schema(
    {email:{type:String,required:true},
    password:{type:String,required:true}}
);
module.exports=mongoose.model("users",userschema)