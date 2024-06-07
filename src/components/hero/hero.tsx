import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero= () => {
   
        return (
            <div className="relative w-full h-[300px] flex  mb-4 mt-4">
                <Image className="object-cover" alt="products image" src="/products.jpg" layout="fill" objectFit="cover" />
                <div className="absolute bottom-0 left-0 mb-4 ml-4">
                    <Link href="/categoria">
                        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-500 transition border border-white">
                            Ir a la Categoría
                        </button>
                    </Link>
                </div>
            </div>
        );
    };
 export default Hero
