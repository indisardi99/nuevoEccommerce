'use client'
import { useAuthContext } from "@/context/AuthContext";
import { getProductById } from "@/helpers/productHelper";
import { IProduct, IUserSession } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductPage = ({params}: {params: {id: string}}) => {
    const router = useRouter()
    const [product, setProduct] = useState<IProduct>()
    const {userData} = useAuthContext()
    
    useEffect(()=>{
        const fetchData = async () => {
            const product = await getProductById(params.id)
            setProduct(product)
        }
        fetchData()
    },[])

    const handleAddTooCart = (e: any) => {
        if(userData?.token){
            alert("You must be logged in to add products to the cart.")
        }else{
            const cart = JSON.parse(localStorage.getItem("cart")|| "[]")
            const productExist = cart.some((product: IProduct)=>{
                if(product.id === Number(e?.target?.id)) return true;
                return false;
            })
            if (productExist){
                alert("This product exist in your cart!")
            }else{
                cart.push(product)
                localStorage.setItem("cart", JSON.stringify(cart))
                alert("product added to your cart!")
            }
        }
    } 

    return(
        <div className="flex flex-row justify-center items-center bg-white m-4 h-[900px] w-[350px] p-4 text-black flex-wrap border rounded-lg lg:flex lg:flex-row lg:w-full lg:h-full lg:justify-around">
            <img className="h-[350px] w-[350px]" src={product?.image} alt={product?.image}/>
            <div className="flex flex-col flex-wrap justify-center items-start mt-4 px-2 w-[280px]">
                <h3 className="text-lg font-semibold m-2">{product?.name}</h3>
                <p className="text-xl font-bold text-blue-900 m-2">${product?.price}</p>
                <p className="text-gray-600 m-2 text-wrap">
                    {product?.description}
                </p>
                <p className="text-gray-600 m-2">Stock: {product?.stock}</p>
                <p className="text-gray-600 m-2">Category: <Link href={`/search/${product?.categoryId}`}>{product?.category}</Link></p>
                <button id={product?.id.toString()} onClick={handleAddTooCart} className="mt-4 w-full bg-black text-white py-2 rounded-lg transition-colors">Add To cart</button>
            </div>
        </div>

    );
}

export default ProductPage;
