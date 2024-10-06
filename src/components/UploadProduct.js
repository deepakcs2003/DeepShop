import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { productCategory, brandCategory, productColors, commonFeatures, warrantyPeriods, waterResistanceCategories, commonMaterials, performanceCategories, commonCountries } from '../helper/Option'; // Import product brands
import uploadImage from '../helper/uploadImage';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { MdArrowDropDown } from 'react-icons/md'; // Import an icon of your choice
import Select from 'react-select'
export const UploadProduct = ({ onClose, fetchAllProducts }) => {

    const [productData, setProductData] = useState({
        productNAME: "",
        brandNAME: "",
        category: "",
        productIMAGES: [],
        description: "",
        price: "",
        sellingPRICE: "",
        stock: "",  // Include stock if needed
        color: "",  // Include color if needed
        weight: "", // Include weight if needed
        features: [], // Include features if needed
        warranty: "", // Include warranty if needed
        waterResistance: "", // Include waterResistance if needed
        materialUsed: "", // Include materialUsed if needed
        performance: "", // Include performance if needed
        aiPower: false, // Include aiPower if needed
        environmentallyFriendly: false, // Include environmentallyFriendly if needed
        isiCertified: false, // Include isiCertified if needed
        countryOfOrigin: "", // Include countryOfOrigin if needed
    });

    const [images, setImages] = useState([]);

    const handleInputChange = (selectedOptions) => {
        // Check if selectedOptions is an array (multi-select)
        if (Array.isArray(selectedOptions)) {
            // Handle multi-select case
            const selectedValues = selectedOptions.map(option => option.value);

            setProductData(prevData => ({
                ...prevData,
                features: selectedValues, // Store the selected feature values
            }));

            console.log('Selected features:', selectedValues);
        } else if (selectedOptions) {
            // Handle normal select case
            const name = selectedOptions.target.name; // Get the name of the target
            const value = selectedOptions.target.value; // Get the value of the target

            setProductData(prevData => ({
                ...prevData,
                [name]: value, // Store the selected value
            }));

            console.log('Selected single feature:', value);
        }
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
                const uploadImageCloudinary = await uploadImage(file);

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
        console.log("Product Data before submit:", productData); // Debug log

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(summaryApi.product.url, {
                method: summaryApi.product.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify(productData),
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
                toast.error(data.message || 'Failed to upload product data');
            }
            console.log("Upload product data response:", data);
        } catch (error) {
            console.error("Failed to fetch product data for backend:", error);
        }
    };
    console.log("productdata", productData);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pt-20 pb-5">
            <div className="bg-white p-6 border-2 border-gray-800 shadow-2xl w-full max-w-md overflow-y-auto max-h-full mt-10 mb-11">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-green-700">Upload Product</h2>
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

                    {/* Brand Name Dropdown */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Select Brand</label>
                        <select
                            name="brandNAME"
                            value={productData.brandNAME}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="" disabled>Select a brand</option> {/* Add this option */}
                            {brandCategory.map((brand) => (
                                <option value={brand.value} key={brand.id}>
                                    {brand.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Select Category</label>
                        <select
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="" disabled>Select a category</option>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"               // Set as a number input
                            name="stock"
                            value={productData.stock}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter stock amount (optional)"
                            min="0"                    // Minimum value is 0
                            step="1"                   // Increment by whole numbers
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Select Color</label>
                        <div className="relative">
                            <select
                                name="color"
                                value={productData.color}
                                onChange={handleInputChange}
                                className="appearance-none w-full p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                style={{
                                    backgroundColor: productData.color || 'white',
                                    color: productData.color ? (productData.color === 'white' ? 'black' : 'white') : 'black',
                                }}
                            >
                                <option value="" disabled style={{ color: 'black' }}>Select a color</option>
                                {productColors.map((color) => (
                                    <option key={color.id} value={color.value} style={{ backgroundColor: color.value, color: color.value === 'white' ? 'black' : 'white' }}>
                                        {color.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                                <MdArrowDropDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Weight (Optional) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Weight (in kg)</label>
                        <input
                            type="number"               // Set as a number input
                            name="weight"
                            value={productData.weight}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter weight (optional)"
                            min="0"                    // Minimum value is 0
                            step="0.1"                 // Increment by tenths of a kilogram
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Categories</label>
                        <Select
                            options={commonFeatures}
                            value={productData.features.map(value => commonFeatures.find(option => option.value === value))} // Transform value back to options
                            onChange={handleInputChange}
                            isMulti // Enables multiple selection
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select categories"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Warranty</label>
                        <select
                            name="warranty"
                            value={productData.warranty}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        >
                            <option value="">Select a warranty</option>
                            {warrantyPeriods.map(option => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Water Resistance</label>
                        <select
                            name="waterResistance"
                            value={productData.waterResistance}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        >
                            <option value="">Select water resistance level</option>
                            {waterResistanceCategories.map(option => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Material Used</label>
                        <select
                            name="materialUsed"
                            value={productData.materialUsed}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        >
                            <option value="">Select material used</option>
                            {commonMaterials.map(option => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Performance</label>
                        <select
                            name="performance"
                            value={productData.performance}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        >
                            <option value="">Select performance level</option>
                            {performanceCategories.map(option => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">AI Power:</label>
                        <input
                            type="checkbox"
                            name="aiPower"
                            checked={productData.aiPower}
                            onChange={handleInputChange}
                            className="hidden" // Hide the default checkbox
                        />
                        <label
                            htmlFor="aiPower"
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => {
                                // Manually toggle the aiPower state for debugging
                                const newValue = !productData.aiPower;
                                console.log('Manual Toggle - New Value:', newValue);
                                setProductData(prevData => ({
                                    ...prevData,
                                    aiPower: newValue,
                                }));
                            }}
                        >
                            <span className="mr-2 text-sm text-gray-600">{productData.aiPower ? 'YES' : 'NO'}</span>
                            <span className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${productData.aiPower ? 'bg-green-400' : ''}`}>
                                <span className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${productData.aiPower ? 'translate-x-6' : ''}`}></span>
                            </span>
                        </label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">Environmentally Friendly:</label>
                        <input
                            type="checkbox"
                            name="environmentallyFriendly"
                            checked={productData.environmentallyFriendly}
                            onChange={handleInputChange}
                            className="hidden" // Hide the default checkbox
                        />
                        <label
                            htmlFor="environmentallyFriendly"
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => {
                                // Manually toggle the environmentallyFriendly state for debugging
                                const newValue = !productData.environmentallyFriendly;
                                console.log('Manual Toggle - New Value:', newValue);
                                setProductData(prevData => ({
                                    ...prevData,
                                    environmentallyFriendly: newValue,
                                }));
                            }}
                        >
                            <span className="mr-2 text-sm text-gray-600">{productData.environmentallyFriendly ? 'YES' : 'NO'}</span>
                            <span className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${productData.environmentallyFriendly ? 'bg-green-400' : ''}`}>
                                <span className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${productData.environmentallyFriendly ? 'translate-x-6' : ''}`}></span>
                            </span>
                        </label>
                    </div>
                    

                    <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4">ISI Certified:</label>
                <input
                    type="checkbox"
                    name="isiCertified"
                    checked={productData.isiCertified}
                    onChange={handleInputChange}
                    className="hidden" // Hide the default checkbox
                />
                <label
                    htmlFor="isiCertified"
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={() => {
                        // This click handler will toggle the state
                        const newValue = !productData.isiCertified;
                        console.log('Manual Toggle - New Value:', newValue);
                        setProductData(prevData => ({
                            ...prevData,
                            isiCertified: newValue,
                        }));
                    }}
                >
                    <span className="mr-2 text-sm text-gray-600">{productData.isiCertified ? 'YES' : 'NO'}</span>
                    <span className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${productData.isiCertified ? 'bg-green-400' : ''}`}>
                        <span className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${productData.isiCertified ? 'translate-x-6' : ''}`}></span>
                    </span>
                </label>
            </div>


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin:</label>
                <select
                    name="countryOfOrigin"
                    value={productData.countryOfOrigin}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select a country</option>
                    {commonCountries.map(country => (
                        <option key={country.value} value={country.value}>
                            {country.label}
                        </option>
                    ))}
                </select>
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
