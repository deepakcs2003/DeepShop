
const Product = require("../Models/uploadProductModel");

const getCategoryWiseProduct=async(req,res)=>{
    try{
        const {category}=req?.body || req.query;
        console.log(category);
        const allProduct=await Product.find({category});
        res.status(200).json({
            data:allProduct,
            message:"all category wise  product detail get successfully",
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

module.exports=getCategoryWiseProduct;