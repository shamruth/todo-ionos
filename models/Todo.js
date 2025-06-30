//todoschema and model
const mongoose = require("mongoose");
const todoschema=new mongoose.Schema(
    {datetime:{type:Date},
    title:{type:String},
    description:{type:String},
    status:{type:String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }}
);
module.exports = mongoose.model("Todo", todoschema);
