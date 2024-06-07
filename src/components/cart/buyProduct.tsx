'use client'
import { createOrder } from "@/helpers/ordersHelper";
import { IProduct, IUserSession } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BuyProduct = () => {
    const router = useRouter();
    const [total, setTotal] = useState<number>(0);
    const [cart, setCart] = useState<IProduct[]>([]);
    const [userData, setUserData] = useState<IUserSession | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession") || "null");
            setUserData(userData);
            if (!userData?.token) {
                router.push("/login");
            }
        }
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (storedCart.length > 0) {
            let totalCart = 0;
            storedCart.forEach((item: IProduct) => {
                totalCart += item.price;
            });
            setTotal(totalCart);
            setCart(storedCart);
        }
    }, [router]);

    const handleClick = async () => {
        const idProducts = new Set(cart.map((product) => product.id));
        await createOrder(Array.from(idProducts), userData?.token!);
        alert("Your purchase was successful. You will be redirected to the home page.");
        setCart([]);
        setTotal(0);
        localStorage.setItem("cart", "[]");
        router.push("/order");
    }

    return (
        <div className="bg-white flex flex-col w-full h-[250px] rounded-lg border text-black border-black p-4">
            <div className="p-4">
                <h1 className="font-bold text-xl mb-4">Order Summary</h1>
                <div className="flex justify-between mb-2">
                    <span>Thank you for your purchase.</span>
                    <span>${total}</span>
                </div>
                <div className="flex justify-between font-bold mb-4">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded w-full">Buy</button>
            </div>
        </div>
    );
}

export default BuyProduct;
