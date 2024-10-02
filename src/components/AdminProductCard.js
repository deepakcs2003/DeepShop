import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { AdminProductEdit } from './AdminProductEdit';

export const AdminProductCard = ({ allProducts, fetchAllProducts }) => {
    const [visibleCount, setVisibleCount] = useState(10); // Initial number of visible products
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const loadMoreProducts = () => {
        // Increase the number of visible products
        setVisibleCount((prevCount) => prevCount + 10);
    };

    const visibleProducts = allProducts.slice(0, visibleCount);

    return (
        <div className="p-6">
            {/* Horizontal Scroll on Mobile, Grid on larger screens */}
            <div className="sm:hidden flex overflow-x-auto space-x-4">
                {visibleProducts.length > 0 ? (
                    visibleProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex-shrink-0 border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-64 bg-white" // Adjust width to fit scrolling
                        >
                            <div className="relative">
                                <img
                                    src={product.productIMAGES[0]?.url || '/default-image.jpg'}
                                    alt={product.productNAME}
                                    className="w-full h-52 object-contain rounded-t-lg pt-2"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                                    {product.productNAME}
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    <strong>Brand:</strong> {product.brandNAME}
                                </p>
                                <p className="text-gray-600 text-sm mb-1">
                                    <strong>Category:</strong> {product.category}
                                </p>
                                <p className="text-gray-700 text-sm mt-2 mb-4 truncate">
                                    {product.description}
                                </p>
                                <div className="flex justify-between flex-col gap-2">
                                    <span className="text-lg font-bold text-gray-800">
                                        <strong>Price:</strong> ₹{product.sellingPRICE.toFixed(2)}
                                    </span>
                                    <button
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition duration-300 ease-in-out"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <MdEdit className="text-white" />
                                        Edit
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

            {/* Grid Layout for Larger Screens */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleProducts.length > 0 ? (
                    visibleProducts.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-full max-w-sm bg-white"
                        >
                            <div className="relative">
                                <img
                                    src={product.productIMAGES[0]?.url || '/default-image.jpg'}
                                    alt={product.productNAME}
                                    className="w-full h-52 object-contain rounded-t-lg pt-2"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                                    {product.productNAME}
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    <strong>Brand:</strong> {product.brandNAME}
                                </p>
                                <p className="text-gray-600 text-sm mb-1">
                                    <strong>Category:</strong> {product.category}
                                </p>
                                <p className="text-gray-700 text-sm mt-2 mb-4 truncate">
                                    {product.description}
                                </p>
                                <div className="flex justify-between flex-col gap-2">
                                    <span className="text-lg font-bold text-gray-800">
                                        <strong>Price:</strong> ₹{product.sellingPRICE.toFixed(2)}
                                    </span>
                                        <button
                                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition duration-300 ease-in-out"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            <MdEdit className="text-white" />
                                            Edit
                                        </button>
                                   
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

            {/* Load More Button */}
            {allProducts.length > visibleCount && (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMoreProducts}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Load More Products
                    </button>
                </div>
            )}

            {/* Render Edit Modal if a product is selected and modal is open */}
            {isModalOpen && selectedProduct && (
                <AdminProductEdit
                    onClose={() => setIsModalOpen(false)}
                    data={selectedProduct}
                    fetchAllProducts={fetchAllProducts}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
