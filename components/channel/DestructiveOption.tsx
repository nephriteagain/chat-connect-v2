"use client"

import { ReactNode, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"


export default function DestructiveOption(
    {
        children, 
        onClick,
        name
    }: {
        children: ReactNode;
        onClick: () => void;
        // for deleting operation only
        name?: string;
    }
) {
    const [ inputVal, setInputVal ] = useState('')

    return (

        <AlertDialog>
            <AlertDialogTrigger className="px-2 py-1 text-red-600 hover:text-red-600 hover:bg-red-100">
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
                { name && <div className="p-2 flex flex-col items-center justify-center gap-2">
                    <p className="text-sm opacity-70 text-red-700">
                        type the name of the channel to permanently delete the channel
                    </p>
                    <div className="relative w-fit h-fit">                        
                        <p className="pointer-events-none flex items-center text-sm px-3 h-10 absolute overflow-hidden opacity-40">{name}</p>
                        <Input 
                            type='text' 
                            name='name' 
                            value={inputVal} 
                            onChange={(e) => setInputVal(e.currentTarget.value)}
                            className={` ${inputVal !== name ? 'border-red-600 bg-red-100': ''}`}
                        />
                    </div>
                </div>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClick}
                    disabled={name !== inputVal}
                    className="transition-all duration-200 bg-red-600 hover:bg-red-800"
                >
                    Continue
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}