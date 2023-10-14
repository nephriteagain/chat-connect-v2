"use client"

import { format } from 'date-fns';
import type { roomBanner } from '@/types';
import { useListenRooms } from '@/hooks/useListenRooms';
import { useGetSenderName } from '@/hooks/useGetSenderName';
import { useRouter } from 'next/navigation';




export default function ChatRooms() {
    const rooms = useListenRooms()

    return (
        <div className='overflow-y-scroll'>
            {rooms.map(room => {
                return <ChatRoom key={room.id} room={room} />
                                    
            })}
        </div>
    )
}

function ChatRoom({room}: {room: roomBanner}) {



    const router = useRouter()
    const { id } = room

    const name = useGetSenderName(room?.lastMessage?.sender, [room?.lastMessage?.sender])

    return (
        <div className="flex flex-row gap-1 relative hover:bg-[#e6e6e6] rounded-lg p-2 cursor-pointer"
            onClick={() => {
                router.push(`/c/${id}`)
            }}
        >
            <div className='basis-1/6 flex items-center justify-center'>
                <div className="w-[85%] aspect-square rounded-full bg-neutral-700 text-white text-2xl flex items-center justify-center">                
                    {room.name[0]}
                </div>
            </div>
            <div className='overflow-hidden flex-grow w-1/2'>
                <p className='font-semibold text-lg'>
                    {room.name}
                </p>
                <p className='whitespace-nowrap text-ellipsis'>
                    {
                        room?.lastMessage ?
                        <>
                        <span className='me-1'>
                            {name || ''}:
                        </span>
                        <span className='opacity-80'>
                        {room?.lastMessage?.message || ''}
                        </span>
                        </> :
                        'Channel created'
                    }
                    
                </p>
            </div>
            <div className="">
                {room?.lastMessage?.date &&
                    <p className='text-sm opacity-60 font-semibold'>
                    {format(room.lastMessage.date, 'hh:mm a')}
                   </p>
                }                
            </div>
        </div>
    )
}