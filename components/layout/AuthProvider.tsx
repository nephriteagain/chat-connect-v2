"use client"

import { useAppSelector } from "@/redux/hooks";

import { ReactNode, useEffect, useState } from "react";
import { useSignin } from "@/hooks/useSignin";
import { useListenUser } from "@/hooks/useListenUser";

import { FcGoogle } from 'react-icons/fc'
import { BsFillChatLeftTextFill } from "react-icons/bs";



import Image from "next/image";

const title = 'ChatConnect'

const slogan = `"Where Conversations Thrive, Connections Flourish!"`

export default function AuthProvider({children}: {children: ReactNode}) {
    const { user } = useAppSelector(s => s.user)
    const signIn = useSignin()

    const [ index, setIndex ] = useState(0)

    useListenUser(user?.id)

    useEffect(() => {
        setInterval(() => {
            setIndex(i => {
                return i === title.length - 1 ? 0 : i + 1
            })
        }, 1000)
    }, [])

    if (user === null) {
        return (
            <body className="p-2 flex flex-col items-center justify-center gap-6 w-screen h-screen">               
                <div className="fixed top-0 left-0 w-screen h-screen">
                    <Image 
                        src={'https://plus.unsplash.com/premium_photo-1681487683141-e72c5ccd94e6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        className="w-full h-full"                        
                        alt=""
                        width={1400}
                        height={800}
                    />
                </div>
                <div className="min-h-[160px] flex flex-col items-center justify-center gap-2 z-[1000] p-4 bg-white rounded-xl shadow-xl">
                    <h1 className="font-bold  text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                        {title.split('').map((t,i) => {
                            return (
                                <span key={i} className={`${index === i ? 'text-green-600': ''} transition-all duration-150`} >
                                    {t}
                                </span>
                            )
                        })}
                        <BsFillChatLeftTextFill className=" inline ms-4 hover:scale-110 hover:fill-green-600 transition-all duration-150" />
                    </h1>
                    <p className="text-center italic text-sm opacity-60">
                        {slogan}
                    </p>
                </div>
                
                <div 
                    className="cursor-pointer hover:drop-shadow-lg w-fit"
                >
                    <button className="flex flex-row items-center gap-5 bg-white drop-shadow-md shadow-md px-2 py-3 border border-gray-300 rounded-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-150"
                        onClick={signIn}
                    >
                        <span className="flex items-center justify-center text-3xl aspect-square">
                            <FcGoogle/>
                        </span>
                        <p className="opacity-70 font-semibold text-lg">
                            Sign in with Google
                        </p>
                    </button>
                </div>
            </body>
        )
    }
    return <>{children}</>
}

