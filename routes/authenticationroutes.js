const express=require("express")
const router=express.Router();
const authenticationcont=require("../controllers/authentication");

router.post("/register",authenticationcont.register);
router.post("/login",authenticationcont.login);

module.exports=router;