import { useState, ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { motion, AnimatePresence } from "framer-motion"
import { BiArrowBack } from 'react-icons/bi'
import { TbCameraPlus } from 'react-icons/tb'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { createNewChannel, createNewPrivateChat } from "@/redux/thunks"

import { ReactDispatch } from "@/types"

import InviteUsers from "./InviteUsers"

export default function NewChannel({
    setShowNewChannel, channelType, showInvite, setShowInvite
}: {setShowNewChannel: ReactDispatch<boolean>; 
    channelType: 'channel'|'group'|'private'
    showInvite: boolean;
    setShowInvite: ReactDispatch<boolean>;
}) {
    const [ nameFocused, setNameFocused ] = useState(false)
    const [ descFocused, setDescFocused ] = useState(false)
    const [ name, setName ] = useState('')
    const [ desc, setDesc ] = useState('')
    const [ nameLength, setNameLength ] = useState(0)
    const [ members, setMembers ] = useState<{id:string; role:'admin'|'mod'|'member'}[]>([])
    const [ otherUser, setOtherUser ] = useState<null|{id:string; name: string}>(null)
    const [ profile, setProfile ] = useState<null|{type:string;data:string}>(null)
    const [ fileData, setFileData ] = useState('')


    const { user } = useAppSelector(s => s.user)
    const dispatch = useAppDispatch()

    async function handleClick() {
        const makerId = user?.id as string;
        try {
            if (channelType === 'private') {
                if (!otherUser?.id || !user?.name) return
                await dispatch(createNewPrivateChat({
                    userId: makerId, 
                    otherUserId: otherUser.id, 
                    userName: user.name, 
                    otherUserName: otherUser.name 
                }))
            } else {
                await dispatch(createNewChannel({makerId, name, desc, type: channelType, members, profile}))
            }
            setShowInvite(false)
            setShowNewChannel(false)
        } catch (error) {
            console.error(error)
        }
    }

    function changeProfile(e: ChangeEvent<HTMLInputElement>) {
        const val : FileList|null = e.currentTarget.files
        if (val) {
            const file = val[0]
            if (file && file.size > 5_000_000) {
                console.error('file too large!')
            }
            if (file) {
                console.log(file.type)
                const reader =  new FileReader()
                reader.onload = event => {
                    const fileAsDataURL = event.target?.result
                    if (typeof fileAsDataURL === 'string') {
                        setProfile({type: file.type, data: fileAsDataURL})
                        setFileData(fileAsDataURL)
                    }
                }
                reader.readAsDataURL(file)
            }
        }
    
    }
    
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
                    onClick={() => {
                        setShowNewChannel(false)
                    }}
                >
                    <BiArrowBack />
                </div>
                <p className="font-semibold">
                    New Channel
                </p>
            </div>
            <div className="flex flex-col items-center justify-center pt-9 px-2 gap-8">
                <div className="relative bg-blue-600 rounded-full w-[130px] aspect-square flex items-center justify-center group">
                    <TbCameraPlus className="z-10 stroke-white text-5xl group-hover:scale-125 transition-transform duration-200 drop-shadow-md" />
                    <input 
                        type="file" 
                        name="profile" 
                        id="profile"
                        className="absolute w-full h-full z-20 opacity-0" 
                        accept="image/png,image/jpeg"
                        onChange={changeProfile}
                    />
                    <img 
                        src={fileData}
                        alt=''
                        className="absolute w-full h-full rounded-full"
                    />
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
                        onBlur={(e) => {
                            if (e.currentTarget.value.length === 0) {
                                setNameFocused(false)
                            }
                        }}
                        onChange={(e) => {
                            setName(e.currentTarget.value)
                            setNameLength(e.currentTarget.value.length)
                        }}

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
                        onBlur={(e) => {
                            if (e.currentTarget.value.length === 0) {
                                setDescFocused(false)
                            }
                        }}
                        onChange={(e) => setDesc(e.currentTarget.value)}
                    />
                </div>
            </div>
            <AnimatePresence>
                {
                    Boolean(nameLength) &&
                    <motion.div 
                        initial={{x: '110%'}}
                        animate={{x: 6}}
                        exit={{x: '110%'}}
                        transition={{duration: 0.2}}
                        className="w-fit text-3xl absolute p-4 right-6 bottom-6 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        onClick={() => setShowInvite(true)}
                        >
                    <AiOutlineArrowRight  className="fill-white" />
                    </motion.div>
                }
                
            </AnimatePresence>
            <AnimatePresence>
            {
                showInvite && 
                <InviteUsers 
                    setShowInvite={setShowInvite} 
                    handleClick={handleClick} 
                    setMembers={setMembers}
                    otherUser={otherUser}
                    setOtherUser={setOtherUser}
                />            
            }
            </AnimatePresence>
                        
        </motion.div>
    )
}