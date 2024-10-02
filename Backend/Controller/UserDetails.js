const userSignUpModel = require("../Models/userSignUpModel");

 const userDetailsController=async(req,res)=>{
    try{
        // console.log(req.user);
        const user=await userSignUpModel.findById(req.user.id);
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })
    }catch(err){
        res.status(400).json({
            message:err.message|| err,
            error:true,
            succuess:false,
        })
    }
 }
 module.exports=userDetailsController;