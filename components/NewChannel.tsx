import { useState } from "react"

import { motion } from "framer-motion"
import { BiArrowBack } from 'react-icons/bi'
import { TbCameraPlus } from 'react-icons/tb'
import { Dispatch, SetStateAction } from 'react'


export default function NewChannel({setShowNewChannel}: {setShowNewChannel: Dispatch<SetStateAction<boolean>>}) {
    const [ nameFocused, setNameFocused ] = useState(false)
    const [ descFocused, setDescFocused ] = useState(false)
    const [ name, setName ] = useState('')
    const [ desc, setDesc ] = useState('')

    return (
        <motion.div 
            initial={{x:'100%'}}
            animate={{x:'0%'}}
            exit={{x:'100%'}}
            transition={{duration: 0.2}}
            className="w-full h-full bg-white z-50 absolute top-0 left-0 p-2"
        >
            <div className="flex flex-row gap-6 text-xl items-center">
                <div className="text-3xl text-gray-500 rounded-full p-2 hover:bg-gray-100"
                    onClick={() => setShowNewChannel(false)}
                >
                    <BiArrowBack />
                </div>
                <p className="font-semibold">
                    New Channel
                </p>
            </div>
            <div className="flex flex-col items-center justify-center pt-9 px-2 gap-8">
                <div className="bg-blue-600 rounded-full w-[130px] aspect-square flex items-center justify-center">
                    <TbCameraPlus className="stroke-white text-5xl hover:scale-125 transition-transform duration-200" />
                </div>
                <div className="w-full h-fit relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!nameFocused ? 'text-lg left-6 top-4 opacity-60' : 'text-sm left-6 -top-2 text-blue-600'}`}>
                        Channel name
                    </motion.p>
                    <input 
                        type="text" 
                        className="px-6 w-full border border-gray-200 py-4 text-lg rounded-lg focus:outline-blue-600" 
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                        onChange={(e) => setName(e.currentTarget.value)}

                    />
                </div>
                <div className="w-full relative h-fit">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!descFocused ? 'text-lg left-6 top-4 opacity-60' : 'text-sm left-6 -top-2 text-blue-600'}`}>
                            Description (optional)
                    </motion.p>
                    <input 
                        type="text" 
                        className="px-6 w-full border border-gray-200 py-4 text-lg rounded-lg focus:outline-blue-600" 
                        onFocus={() => setDescFocused(true)}
                        onBlur={() => setDescFocused(false)}
                        onChange={(e) => setDesc(e.currentTarget.value)}
                    />
                </div>
            </div>
        </motion.div>
    )
}