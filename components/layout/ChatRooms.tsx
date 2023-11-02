"use client"

import { format } from 'date-fns';
import { useListenRooms } from '@/hooks/useListenRooms';
import { useGetSenderName } from '@/hooks/useGetSenderName';
import { useGetImageURL } from '@/hooks/useGetImageURL';
import { useRouter } from 'next/navigation';
import type { message } from '@/types';




export default function ChatRooms() {
    const rooms = useListenRooms()

    return (
        <div className='overflow-y-scroll'>
            {rooms.map(room => {
                const { id, name, type, lastMessage, at, profile } = room
                return <ChatRoom 
                    key={id}
                    id={id}
                    roomName={name}
                    type={type}
                    lastMessage={lastMessage}
                    at={at}
                    profile={profile}
                />
            })}
        </div>
    )
}

function ChatRoom({id, roomName, type, lastMessage, at, profile}: {
    id: string;
    roomName: string;
    type: 'channel'|'group'|'private'
    lastMessage: message|undefined
    at: string;
    profile?:string;
}) {


    const router = useRouter()

    const name = useGetSenderName(lastMessage?.sender, [lastMessage?.sender])
    const imageURL = useGetImageURL(profile)

    return (
        <div className="flex flex-row gap-1 relative hover:bg-[#e6e6e6] rounded-lg p-2 cursor-pointer"
            onClick={() => {
                if (type !== 'private') {
                    router.push(`/c/${id}`)                    
                } else {
                    router.push(`/u/${id}`)
                }
            }}
        >
            <div className='basis-1/6 flex items-center justify-center'>
                <div className="relative w-[85%] max-h-20 aspect-square rounded-full bg-neutral-700 text-white text-2xl flex items-center justify-center">                
                    { Boolean(imageURL) ? <img 
                    src={imageURL}
                    alt=''
                    className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                    /> :
                    roomName[0]}
                </div>
            </div>
            <div className='overflow-hidden flex-grow w-1/2'>
                <p className='font-semibold text-lg'>
                    {roomName}
                </p>
                <p className='whitespace-nowrap text-ellipsis'>
                    {
                        lastMessage ?
                        <>
                        <span className='me-1'>
                            {name || ''}:
                        </span>
                        <span className='opacity-80'>
                        {lastMessage?.message || ''}
                        </span>
                        </> :
                        type === 'channel' ? 'Channel created' :
                        type === 'group' ? 'Group created' :
                        'Chat created'
                    }
                    
                </p>
            </div>
            <div className="">
                {lastMessage?.date &&
                    <p className='text-sm opacity-60 font-semibold'>
                    {format(lastMessage.date, 'hh:mm a')}
                   </p>
                }                
            </div>
        </div>
    )
}