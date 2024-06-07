'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IUserSession } from '@/types';
import Link from 'next/link';

const Profile = () => {
     
    const [userData, setUserData] = useState<IUserSession>()
   
    useEffect(()=>{
        if (typeof window !== "undefined" && window.localStorage) {
          const userData = localStorage.getItem("userSession");
          setUserData(userData ? JSON.parse(userData) : null);
        }
      }, []);

 


    return (
        <div className="container w-full p-4 h-full flex flex-col items-center">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
                <div className="flex flex-col lg:flex-row items-center p-4 lg:h-[300px]">
                    <div className="flex justify-center lg:justify-start">
                        <Image className='m-2 rounded-full' alt='user' src={'/user.webp'} width={200} height={200}/>
                    </div>
                    <div className="text-black lg:ml-4 text-center lg:text-left mt-4 lg:mt-0">
                        <h1 className="text-2xl font-bold"></h1>
                        <h1>{userData?.userData.name}</h1>
                        <h2>{userData?.userData.address}</h2>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-4xl mt-6 '>
                <EditUser />
            </div>
        </div> 
    );
}

const EditUser = () => { 

    return ( 
        <div className="bg-white shadow-md rounded-lg p-4">
            <h1 className=" text-black text-xl font-semibold mb-4">Your Account</h1>
            <div className="flex flex-col space-y-4">
                <button className="py-2 px-4 bg-black text-white rounded-md shadow hover:bg-gray-600">Personal Information</button>
                    <Link href={"/order"}>
                       <div className="flex items-center text-center py-2 px-4 bg-black text-white rounded-md shadow hover:bg-gray-600">purchase history</div>
                    </Link>
                <button  className ="py-2 px-4 bg-black text-white rounded-md shadow hover:bg-gray-600">Sign out</button>
            </div>
        </div>
    );
}

export default Profile;
