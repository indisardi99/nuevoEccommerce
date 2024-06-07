'use client'
import { getOrders } from "@/helpers/ordersHelper";
import { IOrder, IUserSession } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
    const [userData, setUserData] = useState<IUserSession>();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    useEffect(()=>{
        if (typeof window !== "undefined" && window.localStorage) {
          const userData = localStorage.getItem("userSession");
          setUserData(JSON.parse(userData!));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(userData?.token) {
                const ordersResponse = await getOrders(userData.token);
                setOrders(ordersResponse);
            }
        }
        fetchData();
    }, [userData?.token]);

    const handleOrderClick = (order: IOrder) => {
        setSelectedOrder(order);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Orders:</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="mb-4">
                        <div className="flex justify-between items-center border-b border-gray-300 pb-2 cursor-pointer" onClick={() => handleOrderClick(order)}>
                            <div>
                                <p className="font-bold">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p>Status: {order.status}</p>
                            </div>
                            <p className="text-blue-500">Click to see products</p>
                        </div>
                        {selectedOrder && selectedOrder.id === order.id && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold mb-2">Products Purchased:</h2>
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product.id}>
                                            <p>{product.name}</p>
                                           
                                            <p>Price: ${product.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>
                    <h1 className="text-lg font-semibold mb-4">You dont have any purchases yet.</h1>
                    <div>
                        <Link href={"/"}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Buy Now!</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderPage;
