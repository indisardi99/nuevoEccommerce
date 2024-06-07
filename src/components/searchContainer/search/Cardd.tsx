import React from 'react';
import {IProduct} from '@/types'
import Image from 'next/image';

const Search:React.FC<IProduct>  = ({name, price, image}) => {
    return( 
    <div className="flex flex-col justify-center max-w-xs items-center bg-indigo-100 m-4 h-[408px] w-[295px] p-4">
      <Image className='m-2' alt={name} src={image} width={295} height={298}/>
      <div className='flex flex-col justify-center items-start mt-8 w-full'>
        <h2 className='text-black mb-2'>{name}</h2>
        <p className='text-black'>{`$ ${price}`}</p>
      </div>
    </div>
    )
}

export default Search