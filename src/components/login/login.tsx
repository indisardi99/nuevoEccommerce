'use client'
import validateLogin from "@/helpers/validateLogin";
import { IValidateError, IValidateLogin } from "@/types";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { login } from "@/helpers/out-helper";
import { useAuthContext } from "@/context/AuthContext";


const Login = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuthContext();
  
  const [dataUser, setDataUser] = useState<IValidateLogin>({
    email: "",
    password: ""
    });
  const [errorUser, setErrorUser] = useState<IValidateError>({ 
    email: "",
    password: ""
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
          const res = await login(dataUser)
          const {token, user} = res ;

            setUserData({token, userData: user })
           alert("You have successfully login")
          router.push("/")
          // window.location.reload();
        
        } catch (error:any) {
           throw new Error(error)
        }
       }

  useEffect(()=>{
    let errors = validateLogin(dataUser)
    setErrorUser(errors)
  },[dataUser])


  return (
    <div className="flex justify-center items-center h-screen lg:h-full lg:w-full">
      <form onSubmit={handleSubmit} className="bg-black border-2 border-white p-6 rounded lg:h-[460px] lg:w-[600px] lg:p-8 lg:border-4">
        <h2 className="text-2xl mb-4">Login</h2>
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
        <button type="submit" className="bg-white text-black p-2 rounded mb-2 flex flex-col">Sing In</button>
        <h1 className="block mb-2 p-2">Are you not registered?</h1>
        <button type="button" className="bg-white text-black p-2 rounded mb-2 flex flex-col">Register</button>
      </form>
    </div>
  );
};

export default Login;
