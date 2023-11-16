"use client"

import { format } from 'date-fns';
import { useListenRooms } from '@/hooks/useListenRooms';
import { useGetSenderName } from '@/hooks/useGetSenderName';
import { useGetImageURL } from '@/hooks/useGetImageURL';
import { useGetProfileURL } from '@/hooks/useGetProfileURL';
import { useMouseLoading } from '@/hooks/useMouseLoading';
import type { message } from '@/types';
import Image from 'next/image';
import Link from 'next/link';



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

    const loading = useMouseLoading()

    const name = useGetSenderName(lastMessage?.sender, [lastMessage?.sender])
    const secondHalf = id.slice(Math.floor(id.length/2))
    const profileURL = useGetProfileURL(secondHalf)
    const URL = type === 'private' ? profileURL : profile
    const imageURL = useGetImageURL(URL)

    return (
        <Link 
            href={type !== 'private' ? `/c/${id}` : `/u/${id}`}
            className="flex flex-row gap-1 relative hover:bg-myPrimary hover:text-black rounded-lg p-2 transition-all duration-150"
            onClick={loading}
        >
            <div className='basis-1/6 flex items-center justify-center'>
                <div className="relative w-[85%] max-h-20 aspect-square rounded-full bg-neutral-700 text-white text-2xl flex items-center justify-center">                
                    { Boolean(imageURL) ? <Image
                    src={imageURL}
                    alt=''
                    className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                    width={200}
                    height={200}
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
        </Link>
    )
}