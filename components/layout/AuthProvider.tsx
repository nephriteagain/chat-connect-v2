"use client"

import { useAppSelector } from "@/redux/hooks";

import { ReactNode } from "react";
import { useSignin } from "@/hooks/useSignin";
import { useListenUser } from "@/hooks/useListenUser";

import { FcGoogle } from 'react-icons/fc'

export default function AuthProvider({children}: {children: ReactNode}) {
    const { user } = useAppSelector(s => s.user)
    const signIn = useSignin()
    const userData = useListenUser(user?.id)

    if (user === null) {
        return (
            <body className="flex items-center justify-center w-screen h-screen">               
                <div 
                    className="cursor-pointer hover:drop-shadow-lg w-fit"
                >
                    <button className="flex flex-row items-center gap-5 drop-shadow-md shadow-md px-2 py-3 border border-gray-300 rounded-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-150"
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

