import { BiSearch, BiArrowBack } from 'react-icons/bi'
import { useListenRoom } from "@/hooks/useListenRoom";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { joinRoom } from '@/redux/thunks';

import RoomSettings from './RoomSettings';
import { useGetImageURL } from '@/hooks/useGetImageURL';
import Image from 'next/image';

export default function Header({hideChat}: {hideChat: () => void}) {
    const channel = useListenRoom()

    const { user } = useAppSelector(s => s.user)
    const dispatch = useAppDispatch()

    const imageURL = useGetImageURL(channel?.profile)

    const joinedRoom = Boolean(user?.channels.some(c => c === channel?.id))

    if (!channel) {
        return null
    }
    

   return (
        <div className="py-1 px-4 flex flex-row items-center gap-2 border-b border-slate-300 shadow-sm drop-shadow-sm bg-myPrimary text-myBackground">
            <div className='sm:hidden  p-2 aspect-square text-3xl hover:bg-gray-100 rounded-full'
                onClick={hideChat}
            >
                <BiArrowBack className="opacity-70" />
            </div>
            <div className="relative w-[45px] aspect-square rounded-full bg-myBackground flex items-center justify-center text-white">
                { Boolean(imageURL) ? <Image
                    src={imageURL}
                    alt=''
                    className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                    width={300}
                    height={300}
                    /> :
                    channel?.name[0].toUpperCase() || 'K'
                }
            </div>
            <div className='me-auto'>
                <p className='font-semibold'>
                {channel?.name || 'loading...'}
                </p>
                <p className='text-sm font-light opacity-80'>
                {channel?.members?.length || 'loading...'} members
                </p>
            </div>
            <div className='flex flex-row items-center gap-2 text-2xl'>
                {  !joinedRoom && <button className='text-sm bg-myPrimary text-white px-6 py-2 h-fit rounded-lg hover:bg-blue-600'
                    onClick={() => {
                        if (!user?.id || !channel?.id) return
                        dispatch(joinRoom({userId: user.id, roomId: channel.id}))
                    }}
                >
                    JOIN
                </button>}
                <span className='aspect-square p-2 hover:bg-myAccent rounded-full flex items-center justify-center transition-all duration-150'>
                    <BiSearch />
                </span>            
                <RoomSettings />
            </div>
        </div>
    )
}