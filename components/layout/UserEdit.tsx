import { BiArrowBack } from "react-icons/bi";
import { BsCheck2 } from 'react-icons/bs'

import { useState, FormEvent } from 'react'

import { motion } from "framer-motion";
import type { ReactDispatch } from "@/types";

export default function UserEdit({firstName, lastName, userName, bio, setShowUserEdit}: {
    firstName: string;
    lastName: string;
    userName: string;
    bio?: undefined|string;
    setShowUserEdit: ReactDispatch<boolean>
}) {

    const [ fName, setFName] = useState(firstName)
    const [ lName, setLName ] = useState(lastName)
    const [ uName, setUName ] = useState(userName)
    const [ biography, setBiography ] = useState(bio? bio : '')

    const [ nameFocus, setNameFocus ] = useState(false)
    const [ lastFocus, setLastFocus ] = useState(false)
    const [ userFocus, setUserFocus ] = useState(false)
    const [ bioFocus, setBioFocus ] = useState(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = {
            fName,
            lName,
            uName,
            biography
        }
    }

    return (
        <motion.div 
            initial={{x:'100%'}}
            animate={{x:'0%'}}
            exit={{x:'100%'}}
            transition={{duration: 0.2}}
            className="z-[9999] p-4 absolute top-0 left-0 w-full h-full bg-white flex flex-col gap-6 items-center"
        >
            <div className="flex flex-row gap-8 items-center w-full pb-2">
                <div 
                    onClick={() => setShowUserEdit(false)} 
                    className="text-2xl text-gray-500 p-2 rounded-full hover:bg-gray-200"
                >
                    <BiArrowBack />
                </div>
                <p className="flex-grow text-left text-lg font-semibold">
                    Edit Profile
                </p>
            </div>
            <div className="text-2xl font-bold w-32 bg-gray-500 rounded-full aspect-square flex items-center justify-center text-white shadow-md drop-shadow-md">
                {firstName[0]}{lastName[0]}
            </div>
            <form className="py-4 flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!nameFocus && fName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        First Name
                    </motion.p>
                    <input 
                        type="text" 
                        required 
                        value={fName}
                        minLength={1}
                        maxLength={70}
                        onChange={(e) => setFName(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                </div>
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!lastFocus && lName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Last Name
                    </motion.p>
                    <input 
                        type="text" 
                        required 
                        value={lName}
                        minLength={1}
                        maxLength={70}
                        onChange={(e) => setLName(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                    />
                </div>
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!bioFocus && biography.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Bio (optional)
                    </motion.p>
                    <input 
                        type="text" 
                        maxLength={500}
                        value={biography}
                        onChange={(e) => setBiography(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setBioFocus(true)}
                        onBlur={() => setBioFocus(false)}
                    />
                </div>
                <p className="font-semibold text-blue-400">
                    Username
                </p>
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!userFocus && uName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Username
                    </motion.p>
                    <input 
                        type="text" 
                        required 
                        maxLength={70} 
                        minLength={5}
                        value={uName}
                        onChange={(e) => setUName(e.currentTarget.value)}                    
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                </div>
                <p className="text-sm opacity-60 font-semibold">
                    for the Username, you can use a-z, 0-9 and underscores. Minimum length of 5 characters
                </p>
                <button type="submit"
                    className="absolute bottom-4 right-4 text-2xl p-4 rounded-full aspect-square bg-blue-400 hover:bg-blue-500 shadow-sm drop-shadow-sm"
                >
                    <BsCheck2 className="fill-white" />
                </button>
            </form>
        </motion.div>
    )
}