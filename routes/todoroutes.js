const express=require("express")
const router=express.Router();
const todocont=require("../controllers/todocontrols");
const verifytoken=require("../middleware/verifyToken");
router.post("/addtask",verifytoken,todocont.addtasks);
router.get("/viewall",verifytoken,todocont.viewall);
router.delete("/delete",verifytoken,todocont.deleteone);  
module.exports=router;