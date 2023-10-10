"use client"

import { FaRegSmile, FaMicrophone } from 'react-icons/fa'
import { TbPaperclip } from 'react-icons/tb'
import { BiSolidSend } from 'react-icons/bi'

import { useState } from 'react'

export default function Chat() {
    const [ inputText, setInputText ] = useState('')

    return (
        <div className="relative flex-grow bg-slate-300 w-full">
            <div className='absolute flex flex-row bottom-6 left-1/2 -translate-x-1/2 gap-2'>
                <div className='relative'>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <FaRegSmile   />
                    </span>
                    <input 
                        type='text' 
                        className='px-12 py-4 w-[450px] focus:outline-none rounded-lg shadow-md drop-shadow-md' 
                        placeholder='Message'
                        onChange={(e) => setInputText(e.currentTarget.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        
                        <TbPaperclip   />
                    </span>
                </div>                
                <div className='bg-[#3390ec] rounded-full  flex items-center justify-center p-4 text-white text-xl cursor-pointer hover:bg-[#334cec]'>
                    {
                        inputText.length === 0 ?
                        <FaMicrophone /> :
                        <BiSolidSend />
                    }
                </div>
            </div>
        </div>
    )
}