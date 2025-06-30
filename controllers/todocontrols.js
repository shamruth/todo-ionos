const todomodel=require("../models/Todo")
exports.addtasks=async(req,res)=>
{
    try
    {
        const newtask=await todomodel.create({...req.body,userId: req.user._id});
        res.json({message:"VALUE INSERTED SUCCESSFULLY",newtask});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("AN ERROR ARRISED WHILE INSERTING THE TASK");
    }
};
exports.viewall=async(req,res)=>
{
    try
    {
        const viewtasks=await todomodel.find({userId:req.user._id});
        res.json(viewtasks);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("ERROR WHILE VIEWING THE DATA");
    }
};
exports.deleteone=async(req,res)=>
{
    try
    {
        const delete_task=await todomodel.findOneAndDelete({
            userId: req.user._id,
            description: req.body.description,
        });
        if(delete_task)
        {
            res.send("TASK_DELETED");
        }
        else
        {
            res.send("TASK NOT DELETED");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("SERVER ERROR");
    }
}