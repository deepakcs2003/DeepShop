import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';
import { Riple } from 'react-loading-indicators';

export const CategoryList = ({ onCategorySelect }) => {
    const [productCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            const response = await fetch(summaryApi.category_product.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const Rdata = await response.json();
            setLoading(false);
            setProductCategory(Rdata?.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    return (
        <div className="container mx-auto pt-4">
            {loading ? (
                <p className="text-center">
                    <Riple color="#32cd32" size="medium" text="" textColor="" />
                </p>
            ) : (
                <div className="flex space-x-4 overflow-x-auto p-4 hide-scrollbar md:scrollbar-visible">
                    {productCategory.map((product, index) => (
                        <Link
                            to={`/category-product/${product.category}`}
                            key={index}
                            className= "bg-gradient-to-r from-red-200 via-red-100 to-red-300 shadow-xl rounded-lg p-2 flex flex-col items-center cursor-pointer hover:shadow-2xl transform transition duration-300 hover:scale-105"
                            style={{ width: '130px', height: '120px' }} // Fixed width and height for cards
                        >
                            {/* Image Container */}
                            <div className="bg-slate-200 rounded-2xl p-1 flex items-center justify-center w-full h-20">
                                {product?.productIMAGES && product.productIMAGES.length > 0 ? (
                                    <img
                                        src={product.productIMAGES[0].url}
                                        alt={product.category}
                                        className="w-full h-full object-contain rounded-lg transition-transform transform hover:scale-110 mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                                        <span className="text-sm text-gray-600">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Category Title */}
                            <p className="text-xs font-semibold text-gray-800 uppercase mt-1 text-center">{product?.category}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
