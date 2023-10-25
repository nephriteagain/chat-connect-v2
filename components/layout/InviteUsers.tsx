import { motion } from "framer-motion";
import { BiArrowBack, BiSolidSend } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchUsers } from "@/redux/thunks";

import { ReactDispatch } from "@/types";

import UserSearchList from "./UserSearchList";

export default function InviteUsers({setShowInvite, handleClick, setMembers, otherUser, setOtherUser}: {
    setShowInvite: ReactDispatch<boolean>; 
    handleClick: () => void;
    setMembers: ReactDispatch<{id:string;role:'admin'|'member'|'mod'}[]>
    otherUser: null|{id:string; name: string};
    setOtherUser: ReactDispatch<null|{id:string; name: string}>
}) {
    const [ inputVal, setInputVal ] = useState('')
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(s => s.user)

    return (
        <motion.div
                className="px-5 py-2 absolute top-0 left-0 w-full h-full z-[60] bg-white"
                initial={{x: '100%'}}
                animate={{x:'0%'}}
                exit={{x: '100%'}}
                transition={{duration: 0.2}}
                >
                <div className="border-b border-gray-200">
                    <div className="flex flex-row gap-4 items-center text-xl">
                        <div 
                            onClick={() => setShowInvite(false)} 
                            className="text-3xl opacity-60 p-2 rounded-full hover:bg-gray-200">
                        <BiArrowBack />
                        </div>
                        <p className="font-semibold">Add Members</p>
                    </div>
                    <form className="py-3 w-full flex flex-row"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            if (inputVal.length === 0 || inputVal.length > 150) return
                            try {
                                if (!user?.id) return
                                await dispatch(searchUsers({q:inputVal,id:user.id}))                                
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                    >
                        <input 
                            type="text" 
                            placeholder="Add people..."
                            className="outline-none text-lg flex-grow" 
                            value={inputVal}
                            onChange={(e) => setInputVal(e.currentTarget.value)}
                            maxLength={150}
                            />
                        <button 
                            type='submit' 
                            className='p-2 hover:bg-gray-100 rounded-full text-2xl'
                            >
                            <BiSolidSend className="fill-blue-400" />
                        </button>
                    </form>
                </div>
                <UserSearchList  
                    setMembers={setMembers} 
                    setOtherUser={setOtherUser}
                />
                <div
                    className="w-fit text-3xl absolute p-4 right-6 bottom-6 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    onClick={handleClick}
                >
                    <AiOutlineArrowRight className="fill-white" />
                </div>                
            </motion.div>
    )
}