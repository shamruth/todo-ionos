require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const port=process.env.PORT;
const mongo_uri=process.env.MONGO_URI;

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

const authentication_routes=require("./routes/authenticationroutes");
const todo_routes=require("./routes/todoroutes")

app.use("/auth",authentication_routes);
app.use("/todo", todo_routes);

app.listen(port,(req,res)=>
{
    console.log(`http://localhost:${port}`);
});