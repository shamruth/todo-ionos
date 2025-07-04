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
            _id: req.body._id
        });
        if(delete_task)
        {
            res.status(200).send("TASK_DELETED");
        }
        else
        {
            res.status(500).send("TASK NOT DELETED");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("SERVER ERROR");
    }
}
exports.status=async(req,res)=>
{
    try
    {
        const status=await todomodel.findOneAndUpdate({_id:req.body._id},{status:req.body.status});
        if(status)
        {
            res.status(200).send("STATUS CHANGED SUCCESSFULL")
        }
    }
    catch(err)
    {
        res.status(500).send("AN ERROR ARRISED");
    }
}