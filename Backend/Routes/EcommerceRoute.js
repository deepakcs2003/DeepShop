const express = require('express');
const router = express.Router();
const userSignUp = require("../Controller/UserSignUp");
const userLogin=require("../Controller/UserSignIn");
// const userDetailsController = require('../Controller/userDetails');
const authToken = require('../MiddleWare/AuthToken');
const userLogOut = require('../Controller/UserLogOut');
const allUsers = require('../Controller/AllUsers');
const userDetailsController = require('../Controller/UserDetails');
const updateUser = require('../Controller/UpdateUser');
const uploadProduct = require('../Controller/uploadProduct');
const getProduct = require('../Controller/getProduct');
const updateProduct = require('../Controller/UpdateProduct');
const productCategory = require('../Controller/ProductCategory');

const getCategoryWiseProduct = require('../Controller/GetCategoryWiseProduct');
const getProductDetails = require('../Controller/GetProductDetails');
const addCart = require('../Controller/AddToCart');
const allCartItem = require('../Controller/AllCartItem');
const deleteCartItem = require('../Controller/DeleteCartItem');
const addToCartCount = require('../Controller/AddToCartCount');



// Define the route for the signup
router.post('/signup', userSignUp);

// define the route for the login
router.post('/login',userLogin)

// user details router
router.get('/user-details',authToken,userDetailsController)

// user logout router
router.get('/logout',userLogOut);


// get all user details and how many user is login 
router.get('/all-user',authToken,allUsers)

//user update role
router.post("/update-user",authToken,updateUser)

//product upload router
router.post("/product-upload",authToken,uploadProduct)

// router for get all product and use any where
router.get("/get-product",getProduct);

//router for upfate the product
router.post("/update-product",authToken,updateProduct);

// get product by category 
router.get("/get-product-category",productCategory);

// get all category wise product to show into frontend side
router.post("/category-product",getCategoryWiseProduct);

// get product details
router.post("/product-details",getProductDetails); 

router.post("/add-to-cart",authToken,addCart)

router.get("/all-cart",authToken,allCartItem);

router.post("/delete-cart",authToken,deleteCartItem)

router.get("/add-to-cart-count",authToken,addToCartCount);
module.exports = router;
