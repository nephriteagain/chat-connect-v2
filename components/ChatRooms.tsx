import { format } from 'date-fns';
import type { room } from '@/types';

interface ChatRoomsProps {
    rooms: room[]
}





export default function ChatRooms({rooms}: ChatRoomsProps) {
    return (
        <div className='overflow-y-scroll'>
            {rooms.map(room => {
                return <ChatRoom key={room.id} room={room} />
                                    
            })}
        </div>
    )
}

function ChatRoom({room}: {room: room}) {    
    return (
        <div className="flex flex-row gap-1 relative hover:bg-[#e6e6e6] rounded-lg p-2">
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
                    <span className='me-1'>
                        {room.lastMessage.sender}:
                    </span>
                    <span className='opacity-80'>
                    {room.lastMessage.message}
                    </span>
                </p>
            </div>
            <div className="">
                <p className='text-sm opacity-60 font-semibold'>
                {format(room.lastMessage.date, 'hh:mm a')}
                </p>
            </div>
        </div>
    )
}