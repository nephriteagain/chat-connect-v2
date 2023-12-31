import { BsAt } from 'react-icons/bs'

import { BiArrowBack } from 'react-icons/bi'
import { HiOutlinePencil } from 'react-icons/hi'
import { CiMenuKebab } from 'react-icons/ci'
import { AiOutlineUser } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'

import { useAppSelector } from '@/redux/hooks'
import { ReactDispatch } from '@/types'

import { motion } from 'framer-motion'
import Image from 'next/image'


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { signOut } from 'firebase/auth'
import { auth }  from '@/db/firebase'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

import UserEdit from './UserEdit'

import { useGetImageURL } from '@/hooks/useGetImageURL'

export default function Profile({setShowProfile}: {setShowProfile: ReactDispatch<boolean>}) {

    const [ showUserEdit, setShowUserEdit ] = useState(false)
    const { user } = useAppSelector(s => s.user)
    const imageURL = useGetImageURL(user?.profile)

    const router = useRouter()

    if (!user) {
        console.log('user not found')
        return null
    }

    const nameSplit = user.name.split(' ')

    const firstInitial = nameSplit[0][0]?.toUpperCase() || 'U'
    const lastInitial = nameSplit[nameSplit.length-1][0]?.toUpperCase() || ''
    

    return (
        <motion.div 
            initial={{x:'100%'}}
            animate={{x:'0%'}}
            exit={{x:'100%'}}
            transition={{duration: 0.2}}
            className="absolute top-0 left-0 bg-myBackground z-[100] w-full h-full flex flex-col items-center gap-10 p-4"
        >
            <AnimatePresence>
                {  showUserEdit && 
                    <UserEdit 
                        firstName={nameSplit[0]}
                        lastName={nameSplit[nameSplit.length-1]}
                        userName={user.userName}
                        bio={user.bio}
                        setShowUserEdit={setShowUserEdit}
                    />
                }
            </AnimatePresence>
            <div className='flex flex-row gap-4 items-center w-full'>
                <div className='p-2 hover:bg-mySecondary rounded-full text-2xl text-myAccent transition-all duration-150'
                    onClick={() => setShowProfile(false)}
                >
                    <BiArrowBack />
                </div >
                <p className='flex-grow text-xl font-semibold'>Profile</p>
                <div className='p-2 hover:bg-mySecondary rounded-full text-2xl text-myAccent  transition-all duration-150'
                    onClick={() => setShowUserEdit(true)}
                >
                    <HiOutlinePencil />
                </div>
                <Popover>
                    <PopoverTrigger className='p-2 hover:bg-mySecondary rounded-full text-2xl text-myAccent transition-all duration-150'>
                        <CiMenuKebab />
                    </PopoverTrigger>
                    <PopoverContent className='z-[1000] w-fit px-2 py-2 cursor-pointer text-red-300 hover:text-red-500 bg-mySecondary border-myAccent transition-all duration-150'>
                        <div className='px-2 py-1 flex flex-row items-center gap-4 rounded-md'
                            onClick={async () => {
                                await signOut(auth)
                                router.push('/')
                            }}
                        >
                            <IoLogOutOutline />
                            <p>Log Out</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='relative font-bold text-2xl rounded-full text-white bg-gray-500 shadow-md drop-shadow-md  w-32 aspect-square flex items-center justify-center'>
                { Boolean(!user?.profile) ?
                `${firstInitial}${lastInitial}` :        
                <Image 
                    src={imageURL}
                    className="absolute w-full h-full rounded-full"
                    alt=''
                    width={500}
                    height={500}
                />
                }
            </div>
            <div className='w-full text-lg'>
                <div className='flex flex-row gap-4 items-center py-1'>
                    <AiOutlineUser className="text-3xl text-gray-500" />
                    <p>{user.name}</p>
                </div>
                <div className='flex flex-row gap-4 items-center py-1'>
                    <BsAt className="text-3xl text-gray-500" />
                    <p>{user.userName}</p>
                </div>
            </div>
            
        </motion.div>
    )
}