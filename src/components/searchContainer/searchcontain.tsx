import React from 'react';
import productsToPreload from '@/helpers/products'
import Cards from '../cards/cards';


const SearchContainer= () => {
    return( 
    <div>
      <Cards products={productsToPreload}/>
    </div>
    )
}

export default SearchContainer