import React from 'react'
import { useParams } from 'react-router-dom'
import FeatureProduct from '../components/FeatureProduct';

export const CategoryProduct = () => {
    const params=useParams();
    // console.log("param name",);
  return (
    <div className='h-full p-6'>
         <FeatureProduct category={params?.categoryName}></FeatureProduct>
      </div>
    
  )
}
