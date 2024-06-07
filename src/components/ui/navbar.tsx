"use client"
import { IUserSession } from '@/types';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaHome, FaList, FaSignInAlt, FaUserPlus, FaUser, FaSearch, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

const Menu = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname()
  
  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(()=>{
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserData(userData ? JSON.parse(userData) : null);
    }
  }, [pathname]);

  return (
    
    <div className={`${isOpen ? 'flex flex-col items-center bg-black p-4 text-white' : 'hidden'} lg:hidden`}>
   

      <div className="flex flex-col w-full">
        <div className="relative w-full mb-4">
          <input
            className="w-full p-2 rounded border-none"
            type="search"
            id="site-search"
            name="q"
            placeholder="Search..."
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700" />
        </div>
        <ul className="flex flex-col w-full font-serif">
          <Link href='/'><li className="flex items-center my-2 p-2 hover:bg-gray-700 rounded"><FaHome className="mr-2" /> Home</li></Link>
          <Link href='/search'><li className="flex items-center my-2 p-2 hover:bg-gray-700 rounded"><FaList className="mr-2" /> All</li></Link>
          {!userData?.token && (
            <>
              <Link href='/login'><li className="flex items-center my-2 p-2 hover:bg-gray-700 rounded"><FaSignInAlt className="mr-2" /> Login</li></Link>
              <Link href='/register'><li className="flex items-center my-2 p-2 hover:bg-gray-700 rounded"><FaUserPlus className="mr-2" /> Register</li></Link>
            </>
          )}
          <Link href='/profile'><span className="flex items-center m-4"><FaUser className="mr-2" /> {userData?.userData?.name ?? "User"}</span></Link>   
       <Link href='/cart'><li className="flex items-center my-2 p-2 hover:bg-gray-700 rounded"><FaShoppingCart className="mr-2" /> Cart</li></Link>
        </ul>
      </div>
    </div>
  );
}

const Navbar = ()=> {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<IUserSession | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  useEffect(()=>{
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserData(userData ? JSON.parse(userData) : null);
    }
  }, []);

  return (
    <nav className={`flex justify-between items-center w-full p-4 ${isOpen && 'flex-col'}`}>
      <h1 className="text-wrap font-bold uppercase text-2xl m-2">TECH STORE</h1>
      <button className={`lg:hidden ${isOpen && 'm-4'}`} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <ul className="hidden font-serif lg:flex">
        <Link href='/'><li className="flex items-center m-4"><FaHome className="mr-2" /> Home</li></Link>
        <Link href='/search'><li className="flex items-center m-4"><FaList className="mr-2" /> All</li></Link>
        {!userData?.token && (
          <>
            <Link href='/login'><li className="flex items-center m-4"><FaSignInAlt className="mr-2" /> Login</li></Link>
            <Link href='/register'><li className="flex items-center m-4"><FaUserPlus className="mr-2" /> Register</li></Link>
          </>
        )}
        </ul>
      <div className="hidden lg:flex items-center space-x-4">
        <div className="relative">
          <input
            className="p-2 rounded border"
            type="search"
            id="site-search"
            name="q"
            placeholder="Search..."
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700" />
        </div>
        <Link href='/profile'><span className="flex items-center m-4"><FaUser className="mr-2" /> {userData?.userData?.name ?? "User"}</span></Link>   
       <Link href='/cart'><span className="flex items-center m-4"><FaShoppingCart className="mr-2" /> Cart</span></Link>
      </div>
      <Menu isOpen={isOpen} />
    </nav>
  )
}
export default Navbar