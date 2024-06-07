'use client'
import validateRegister from "@/helpers/validateRegister";
import { IRegisterError, IValidateRegister } from "@/types"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { register } from "@/helpers/out-helper";


const Register = () => {
    
const router = useRouter();
  
    const [dataUser, setDataUser] = useState<IValidateRegister>({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
}
);
  const [errorUser, setErrorUser] = useState<IRegisterError>({ 
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
});


  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDataUser ({
      ...dataUser,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
     event.preventDefault()
     try {
       const res = await register(dataUser)
       alert("You have successfully register, pleace, login")
       router.push("/login")
     } catch (error:any) {
        throw new Error(error)
     }
    }

  useEffect(()=>{
    let errors = validateRegister(dataUser)
    setErrorUser(errors)
  },[dataUser])

  return (
    <div className="flex justify-center items-center h-screen lg:h-full lg:w-full">
      <form onSubmit={handleSubmit} className="bg-black border-2 border-white p-6 rounded lg:h-[700px] lg:w-[600px] lg:p-8 lg:border-4">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
           className="text-black"
           id="name"
           name="name"
           type="text"
           value={dataUser.name}
           required
           onChange={handleChange}
           placeholder="indira"
          />
          {errorUser.name && <p>{errorUser.name}</p> }
          </div>
        <div className="mb-4">
          <label htmlFor="email-address" className="block mb-2">Email</label>
          <input
           className="text-black"
           id="email-address"
           name="email"
           type="email"
           value={dataUser.email}
           required
           onChange={handleChange}
           placeholder="example@gmail.com"
          />
          {errorUser.email && <p>{errorUser.email}</p> }
        </div>
        <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password</label>
          <input
           className="text-black"
           id="password"
           name="password"
           type="password"
           value={dataUser.password}
           required
           onChange={handleChange}
           placeholder="*********"
          />
          {errorUser.password && <p>{errorUser.password}</p> }
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">Address</label>
          <input
           className="text-black"
           id="address"
           name="address"
           type="text"
           value={dataUser.address}
           required
           onChange={handleChange}
           placeholder="calle falsa 123"
          />
          {errorUser.address && <p>{errorUser.address}</p> }
          </div>
          <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone</label>
          <input
           className="text-black"
           id="phone"
           name="phone"
           type="text"
           value={dataUser.phone}
           required
           onChange={handleChange}
           placeholder="54 11 123456"
          />
          {errorUser.phone&& <p>{errorUser.phone}</p> }
          </div>
        <button type="submit" className="bg-white text-black p-2 rounded mb-2 flex flex-col">Register</button>
        <h1 className="block mb-2 p-2">Are you already registered?</h1>
        <button type="button" className="bg-white text-black p-2 rounded mb-2 flex flex-col">Sing In</button>
      </form>
    </div>
  );
};

export default Register;