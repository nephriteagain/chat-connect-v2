"use client"

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { ReactNode } from "react";
import Image from "next/image";
import { useSignin } from "@/hooks/useSignin";

export default function AuthProvider({children}: {children: ReactNode}) {
    const { user } = useAppSelector(s => s.user)
    const signIn = useSignin()


    if (user === null) {
        return (
            <body className="flex items-center justify-center w-screen h-screen">
                <div>
                    <Image 
                        src="/static/signin.png" 
                        alt="sign in with google" 
                        width={250} 
                        height={100} 
                        className="cursor-pointer hover:drop-shadow-lg"
                        onClick={signIn}
                        priority={true}
                    />
                </div>
            </body>
        )
    }
    return <>{children}</>
}

