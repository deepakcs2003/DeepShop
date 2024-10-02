const Product = require("../Models/uploadProductModel");

const productCategory=async(req,res)=>{
    try{
        const productByCategory=await Product.distinct("category");
        console.log("product categary",productByCategory);
        const firstProduct=[];
        for(const category of productByCategory){
            const product=await Product.findOne({category});
            if(product){
                firstProduct.push(product);
            }
        }
        // console.log("category",firstProduct);
        res.status(200).json({
            message: "Product fetch by category",
            success: true,
            error: false,
            data: firstProduct,
        });
    }catch(err){
        return res.status(400).json({
            message: "No valid fields to update",
            error: true,
            success: false,
          });
    }
}
module.exports=productCategory;