import { BiSearch } from 'react-icons/bi'
import { MdVoiceChat } from 'react-icons/md'

import { useListenRoom } from "@/hooks/useListenRoom";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { joinRoom } from '@/redux/thunks';

import RoomSettings from './RoomSettings';

export default function Header() {
    const channel = useListenRoom()
    const { user } = useAppSelector(s => s.user)
    const dispatch = useAppDispatch()

    const joinedRoom = Boolean(user?.channels.some(c => c === channel?.id))

   return (
    <div className="py-1 px-4 flex flex-row items-center gap-2 border-b border-slate-300 shadow-sm drop-shadow-sm">
        <div className="w-[45px] aspect-square rounded-full bg-green-500 flex items-center justify-center text-white">K
        </div>
        <div className='me-auto'>
            <p className='font-semibold'>
            {channel?.name}
            </p>
            <p className='text-sm font-light opacity-80'>
            {channel?.members.length} members
            </p>
        </div>
        <div className='flex flex-row items-center gap-2 text-2xl'>
            {  !joinedRoom && <button className='text-sm bg-blue-500 text-white px-6 py-2 h-fit rounded-lg hover:bg-blue-600'
                onClick={() => {
                    if (!user?.id || !channel?.id) return
                    dispatch(joinRoom({userId: user.id, roomId: channel.id}))
                }}
            >
                JOIN
            </button>}
            <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                <MdVoiceChat />              
            </span>
            <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                <BiSearch />
            </span>            
            <RoomSettings />
        </div>
    </div>
  )
}