const product=require("../Models/uploadProductModel");
const getProduct=async(req,res)=>{
    try{
        const allProduct=await product.find().sort({createdAt:-1});
        res.status(200).json({
            data:allProduct,
            message:"all product detail get successfully",
            success:true,
            error:false,
        })
    }catch(err){
        return res.status(400).json({
            message: "No valid fields to update",
            error: true,
            success: false,
          });
    }
}
module.exports=getProduct;