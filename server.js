require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const port=process.env.PORT;
const mongo_uri=process.env.MONGO_URI;
const secret=process.env.SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
    {
        return res.status(401).send("Access Denied: No or Invalid Token");
    }
    const token = authHeader.split(' ')[1];
    try 
    {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } 
    catch (err)
    {
        return res.status(403).send("Invalid or Expired Token");
    }
}

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

app.use(express.json());

mongoose.connect(mongo_uri)
.then(()=>
{
    console.log("DB CONNECTED SUCCESSFULLY")
})
.catch((err)=>
{
    console.log("FAILED TO CONNECT TO THE DB");
})
/*for registration and login*/
const userschema=new mongoose.Schema(
    {email:{type:String,required:true},
    password:{type:String,required:true}}
);
const usermodel=mongoose.model("USER",userschema)

app.post('/register',async(req,res,next)=>
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
});

let usertododb="hii"
app.post('/login',(req,res)=>
{
    usermodel.findOne(req.body)
    .then((userdata)=>
    {
        console.log(userdata);
        const data={email:userdata.email,password:userdata.password}
        const token=generateaccesstoken(data);
        const refreshtoken=generaterefreshtoken(data);
        refereshtoken.push(refreshtoken);
        res.json({token,refreshtoken});
        usertododb=(String(userdata._id))
    })
    .catch((err)=>
    {
        console.log(err);
    })
});
/*verifying of the jwt*/
app.post('/verifyjwt',verifyToken,(req,res)=>
{
    res.send("verified successfully");

})


//*todoschema and model

const todoschema=new mongoose.Schema(
    {datetime:{type:Date},title:{type:String},description:{type:String},status:{type:String},userId: { type: mongoose.Schema.Types.ObjectId, ref: 'USER' }}
);

//-------


app.post("/addtask",verifyToken,(req,res)=>
{
/*  const {datetime} =req.body;
    const {title} =req.body;
    const {description} =req.body;
    const {status} =req.body; */
    const todomodel=new mongoose.model(usertododb,todoschema)
    todomodel.create(req.body)
    .then((datatask)=>
    {
        res.send("VALUE INSERTED SUCCESFULLY")
        console.log(datatask._id);
    })
    .catch((err)=>
    {
        res.send("ERROR ARRISED REFER CONSOLE")
        console.log(err);
    })
});

app.post("/viewall",verifyToken,(req,res)=>
{
    const todomodel=new mongoose.model(usertododb,todoschema)
    todomodel.find({userId: req.user._id})
    .then((alltask)=>
    {
        res.json(alltask)
    })
    .catch((err)=>
    {
        res.send("ERROR ARRISED REFER CONSOLE");
        console.log(err);
    })
});

app.delete("/delete",(req,res)=>
{
    const todomodel=new mongoose.model(usertododb,todoschema)
    const {description}=req.body;
    todomodel.findOneAndDelete({
        description:description
    })
    .then(()=>
    {
        res.send("TASKDELETED")
    })
    .catch((err)=>
    {
        console.log(err);
    })
})

app.listen(port,(req,res)=>
{
    console.log(`http://localhost:${port}`);
})