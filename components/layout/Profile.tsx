import { BsAt } from 'react-icons/bs'

import { BiArrowBack } from 'react-icons/bi'
import { HiOutlinePencil } from 'react-icons/hi'
import { CiMenuKebab } from 'react-icons/ci'
import { AiOutlineUser } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'

import { useAppSelector } from '@/redux/hooks'
import { ReactDispatch } from '@/types'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { signOut } from 'firebase/auth'
import { auth }  from '@/db/firebase'


export default function Profile({setShowProfile}: {setShowProfile: ReactDispatch<boolean>}) {
    const { user } = useAppSelector(s => s.user)

    if (!user) {
        console.log('user not found')
        return null
    }

    const firstInitial = user.name.split(' ')[0][0]?.toUpperCase() || 'U'
    const lastInitial = user.name.split(' ')[0][1]?.toUpperCase() || ''

    return (
        <div className="absolute top-0 left-0 bg-white z-[100] w-full h-full flex flex-col items-center gap-10 p-4">
            <div className='flex flex-row gap-4 items-center w-full'>
                <div className='p-2 hover:bg-gray-100 rounded-full text-2xl text-gray-500'
                    onClick={() => setShowProfile(false)}
                >
                    <BiArrowBack />
                </div >
                <p className='flex-grow text-xl font-semibold'>Settings</p>
                <div className='p-2 hover:bg-gray-100 rounded-full text-2xl text-gray-500'>
                    <HiOutlinePencil />
                </div>
                <Popover>
                    <PopoverTrigger className='p-2 hover:bg-gray-100 rounded-full text-2xl text-gray-500'>
                        <CiMenuKebab />
                    </PopoverTrigger>
                    <PopoverContent className='z-[1000] w-fit px-2 py-2 cursor-pointer'>
                        <div className='px-2 py-1 flex flex-row items-center gap-4 hover:bg-gray-200 rounded-md'
                            onClick={() => signOut(auth)}
                        >
                            <IoLogOutOutline />
                            <p>Log Out</p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='font-bold text-2xl rounded-full text-white bg-gray-500 shadow-md drop-shadow-md  w-32 aspect-square flex items-center justify-center'>
                {firstInitial}{lastInitial}
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
            
        </div>
    )
}