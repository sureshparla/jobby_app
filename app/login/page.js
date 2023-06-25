'use client'

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
const [name,setName] = useState("")
const [password,setPassword] = useState("")
const [checked,setChecked] = useState(false)
const [errorMsg,setErrorMsg] = useState(null)
const [person,setPerson] = useState("")

const router = useRouter();


    const onUserName = event =>{
        setName(event.target.value)
    }

    const onUserPassword = event =>{
        setPassword(event.target.value)
    }

    const checkStatus = () =>{
        setChecked(!checked)
    }

    const onSubmitForm = async event =>{
        event.preventDefault()

       
        const userObj = {username:name,password:password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userObj),
        }
        const res = await fetch(url,options)
        const data = await res.json()
        if(res.ok === true){
            Cookies.set('jwtToken',data.jwt_token,{expires:30})
            Cookies.set('username',name,{expires:30})
            router.push('/')
            setPerson(name)
        }
        else{
            setErrorMsg(data.error_msg)
        }
    }

  return (
    <div className='flex items-center flex-col justify-center bg-black h-screen p-5'>
        <h1 className='text-white font-bold text-xl'>Welcome <span className='text-green-500'>{person}</span></h1>
        <img src='https://res.cloudinary.com/dlxshnjr9/image/upload/v1687199088/whatsapp-avatar-update-beta-android-anleitung-1og_j26blz.jpg' alt='person' className='h-20 w-20 rounded-[50px] mt-5 mb-5' />
        <form className='p-3 bg-[#50545a] opacity-[0.95] flex flex-col w-[19rem] md:w-[29rem] rounded'
            onSubmit={onSubmitForm}>
            <img src='	https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='logo' className='mt-3 mb-7 self-center w-36' />
            <label htmlFor='name' className='text-white font-bold' >USERNAME</label>
            <input type='text' id='name' placeholder='Username' 
            className='w-full bg-transparent border-[#abc6e7] border-2 rounded p-1 pl-1 outline-none mt-2 mb-2'
            onChange={onUserName}
            value={name} />
            <label htmlFor='password' className='text-white font-bold' >PASSWORD</label>
            <input type={checked ? 'text' : 'password'} id='password' placeholder='Password' 
            className='w-full bg-transparent border-[#abc6e7] border-2 rounded p-1 pl-1 outline-none mt-2 mb-2'
            onChange={onUserPassword}
            value={password} />
            <div className='flex items-center mt-3 mb-3'>
                <input type='checkbox' id='check' className='h-4 w-4' value={checked} onChange={checkStatus} />
                <label htmlFor='check' className='text-white font-bold ml-2 mr-2'>Show Password</label>
            </div>
            <button type='submit' className='bg-[#3f51b5] text-white font-bold p-1.5 rounded mt-4 mb-5 shadow-xl hover:bg-[#2ca3f2]'>Login</button>
            {errorMsg !== null ? <p className="text-red-600 font-sans text-base mt-2 font-semibold">*{errorMsg}</p> : ""}
        </form>
    </div>
  )
}

export default Login