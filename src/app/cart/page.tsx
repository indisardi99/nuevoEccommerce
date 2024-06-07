import BuyProduct from "@/components/cart/buyProduct"

import ListProduct from "@/components/cart/listProduct"


const Cart = () => {

    return (
        <div className='flex flex-col bg-black justify-start items-start w-full text-white h-full'>
            <h1 className="text-wrap font-bold uppercase text-2xl m-2">YOUR CART</h1>
            <div className="flex flex-col w-full h-full lg:flex lg:flex-row lg:w-full lg:h-full ">
                <div className=" rounded-md flex flex-col w-full border border-gray-600 p-4">
                  <ListProduct/>
                </div>
                <div className= "rounded-md flex flex-col w-full border border-gray-600 p-4 lg:h-auto">
                    <BuyProduct/>
                </div>
            </div>
        </div>
    )
}

export default Cart



