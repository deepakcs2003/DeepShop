import React, { useEffect, useState } from 'react';
import { UploadProduct } from '../components/UploadProduct';
import summaryApi from '../common';
import { AdminProductCard } from '../components/AdminProductCard';

export const AllProducts = () => {
  const [uploadNewProduct, setUploadNewProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(summaryApi.all_product.url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const Rdata = await response.json();
      setAllProducts(Rdata?.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="p-6 overflow-hidden">
        <div className="mb-4 flex justify-between mx-9 items-center">
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
          <button
            onClick={() => setUploadNewProduct(true)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Upload Product
          </button>
        </div>
      {/* Display UploadProduct modal if needed */}
      {uploadNewProduct && (
        <UploadProduct onClose={() => {
          setUploadNewProduct(false);
          fetchAllProducts();
        }} fetchAllProducts={fetchAllProducts}/>
      )}
      <AdminProductCard allProducts={allProducts} fetchAllProducts={fetchAllProducts}/>
    </div>
  );
};
