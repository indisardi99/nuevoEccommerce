import React from 'react';
import Cards from '../cards/cards';
import { getProducts } from '@/helpers/productHelper';
import Hero from '../hero/hero';


const HomeContainer = async () => {
  const products = await getProducts()
    return( 
    <div>
       <Hero/>
      <Cards products={products}/>
    </div>
    )
}

export default HomeContainer