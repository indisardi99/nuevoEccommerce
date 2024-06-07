import { IProduct  } from '@/types'
import React from 'react'
import Card from '../card/card'
import Link from 'next/link'

interface cardsProps {
    products: Array<IProduct>,
}

    const Cards:React.FC<cardsProps> = ({products}: cardsProps) => {
        return (
            <div className='flex bg-black flex-col lg:flex-row justify-center items-center flex-wrap lg:justify-between'>
                {products && 
                products?.map((product)=>{
                    return (
                        <Link key={product.id} href={`/product/${product.id}`}>
                             <Card key={product.id}{...product}/>
                        </Link>
                    )   
                })}
            </div>
        )
    }
export default Cards