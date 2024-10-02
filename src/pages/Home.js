import React, { useEffect, useState } from 'react'
import { CategoryList } from '../components/CategoryList'
import { BannerProduct } from '../components/BannerProduct'
import { HorizontalCardProduct } from '../components/HorizontalCardProduct'
import summaryApi from '../common'

const Home = () => {
  return (
    <div>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalCardProduct category={"mobile"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"airpods"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"camera"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"earphones"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"printers"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"televisions"}></HorizontalCardProduct>
      <HorizontalCardProduct category={"watches"}></HorizontalCardProduct>


    </div>
  )
}

export default Home