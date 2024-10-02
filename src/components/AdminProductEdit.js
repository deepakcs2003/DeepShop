import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import productCategory from '../helper/Category';
import uploadImage from '../helper/uploadImage';
import summaryApi from '../common';
import { toast } from 'react-toastify';

export const AdminProductEdit = ({ onClose ,data,fetchAllProducts }) => {
    const [productData, setProductData] = useState({
        _id:data._id,
        productNAME:data.productNAME,
        brandNAME:data.brandNAME,
        category:data.category, // Ensure this field is initialized
        productIMAGES: data.productIMAGES,  // This will store Cloudinary URLs
        description:data.description,
        price:data.price,
        sellingPRICE:data.sellingPRICE,
    });
    console.log("edit data",productData);
    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve({
                        file,
                        preview: reader.result,
                    });
                };
            });
        });
    
        Promise.all(newImages).then((imagesData) => {
            setImages((prevImages) => [...prevImages, ...imagesData]);
        });
    
        for (const file of files) {
            try {
                const uploadImageCloudinary = await uploadImage(file); // Upload image to Cloudinary
    
                // Store public_id for deletion later
                setProductData((prevData) => ({
                    ...prevData,
                    productIMAGES: [...prevData.productIMAGES, { url: uploadImageCloudinary.url, public_id: uploadImageCloudinary.public_id }],
                }));
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleImageDelete = async (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setProductData((prevData) => ({
            ...prevData,
            productIMAGES: prevData.productIMAGES.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Product Data before submit:", productData); // Debug log

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(summaryApi.update_product.url, {
                method: summaryApi.update_product.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify(productData), // Send productData directly
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                onClose();
                fetchAllProducts();
            } else {
                toast.error(data.message || 'Failed to  edit product data');
            }
            console.log("edit product data response:", data);
        } catch (error) {
            console.error("Failed to fetch product data for backend:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pt-20 pb-5">
            <div className="bg-white p-6 border-2 border-gray-800 shadow-2xl w-full max-w-md overflow-y-auto max-h-full mt-10 mb-11">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-green-700">Edit Product</h2>
                    <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onClose(false)}
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productNAME"
                            value={productData.productNAME}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Brand Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                        <input
                            type="text"
                            name="brandNAME"
                            value={productData.brandNAME}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter brand name"
                        />
                    </div>
                    
                    {/* Category */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Select category</label>
                        <select
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="" disabled>Select a category</option> {/* Add this option */}
                            {productCategory.map((el) => (
                                <option value={el.value} key={el.id}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <input
                            type="file"
                            id="productIMAGES"
                            name="productIMAGES"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        {/* Image Previews with Delete Option */}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image.preview} alt="Product Preview" className="h-32 w-32 object-cover" />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                                        onClick={() => handleImageDelete(index)}
                                    >
                                        <IoMdClose size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter product description"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter product price"
                        />
                    </div>

                    {/* Selling Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPRICE"
                            value={productData.sellingPRICE}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter selling price"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    >
                        Upload Product
                    </button>
                </form>
            </div>
        </div>
    );
};

