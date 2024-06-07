'use client'
import { IProduct, IUserSession } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ListProduct = () => {
   
    const [cart, setCart] = useState<IProduct[]>([])
    const [userData, setUserData] = useState<IUserSession>()
    const [total, setTotal] = useState<number>(0)    

    useEffect(()=>{
        if (typeof window !== "undefined" && window.localStorage) {
          const userData:IUserSession = JSON.parse(localStorage.getItem("userSession")!);
          setUserData(userData);
          !userData?.token && redirect("/login")
        }
        
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
            let totalCart= 0;
            storedCart?.map((item: IProduct)=> {
                totalCart += item.price
            })
            setTotal(totalCart)
            setCart(storedCart)
        }
      }, []);

      const handleRemove = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        let totalCart = 0;
        updatedCart.forEach((item: IProduct) => {
            totalCart += item.price;
        });
        setTotal(totalCart);
        window.location.reload();
    }

    return (
        <div className="flex flex-col w-full items-center justify-between h-full text-black bg-white p-4">
            <div className="w-full lg:w-3/4">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div key={item.id} className="flex flex-row items-center w-full mb-4 border border-gray-300 rounded-lg p-3 shadow-sm">
                            <Image className='m-2 rounded-lg' alt={item.name} src={item.image} width={100} height={100}/>
                            <div className="flex flex-col flex-grow ml-4">
                                <h1 className="font-bold text-lg mb-1">{item.name}</h1>
                                <p className="text-blue-900 mb-2">${item.price}</p>
                            </div>
                            <button 
                                onClick={() => handleRemove(item.id)} 
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">No items in cart</p>
                )}
            </div>
        </div>
    );
}

export default ListProduct
