const jwt=require('jsonwebtoken');
const usermodel=require("../models/user");
const secret=process.env.SECRET;

function generateaccesstoken(data)
{
    const token=jwt.sign(data,secret,{expiresIn:"2400S"})
    return(token)
}

let refereshtoken=[]
function generaterefreshtoken(data)
{
    const token=jwt.sign(data,secret,{expiresIn:"4800s"})
    refereshtoken.push(token);
    return(token);
}

exports.register=async(req,res)=>
{
    const new_user=req.body;
    try
    {
        const duplicate=await usermodel.findOne({email:new_user.email})
        if(duplicate)
           { 
            return res.send("USERALREADYREGISTERED")
           }
        const registering_user=await usermodel.create(new_user);
        res.send("USERREGISTERED")
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.login=async(req,res)=>
{
    try
    {
        const userdata=await usermodel.findOne(req.body);
        if(!userdata)
        {
            return(res.status(401).send("INVALID CREDENTIALS"));
        }
        const data={_id:userdata._id,email:userdata.email,password:userdata.password}
        const token=generateaccesstoken(data);
        const refreshtoken=generaterefreshtoken(data);
        res.json({token,refreshtoken});
    }
    catch(err)
    {
        console.log("ERROR");
        res.status(500).send("SERVER ERROR");
    }
   
}