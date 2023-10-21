import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"

import type { room, userData } from "@/types"

export default function SearchList() {
    const { roomSearches, userSearches } = useAppSelector(s => s.rooms)

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm opacity-60 italic" key={'rooms'}>rooms</p>
            <hr key={'hr-1'} />
            <RoomList rooms={roomSearches} />
            <hr key={'h2-2'} />
            <p className="text-sm opacity-60 italic" key={'users'}>users</p>
            <hr key={'hr-3'} />
            <UserList users={userSearches} />
        </div>

    )
}

function RoomList({rooms}: {rooms: room[]}) {
    return (
        <>
        {rooms.map(s => {
            const { id, name, members } = s
                return <RoomSearchItem 
                key={id} 
                id={id}
                name={name} 
                members={members.length} 
                />        
            })}
        </>
    )
}

function RoomSearchItem({name, members, id}: {name: string; members: number; id: string}) {
    const router = useRouter()
    return (
        <div className="w-full p-2 flex flex-row gap-4 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => router.push(`/c/${id}`)}
        >            
            <div className="w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {name[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">{members} {members > 1 ? 'members' : 'member'}</p>
            </div>
        </div>
    )
}

export function UserList({users}:{users: userData[]}) {
    return (
        <>
        {users.map(s => {
            const { id, name, userName } = s
            return <UserSearchItems 
            key={id}
            id={id}
            name={name}
            userName={userName}
            />
        })}
        </>
    )
    
}

function UserSearchItems({name, userName, id}: {name:string; userName:string; id:string}) {
    const router = useRouter()
    return (
        <div className="w-full p-2 flex flex-row gap-4 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => router.push(`/u/${id}`)}
        >            
            <div className="w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {userName[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">@{userName}</p>
            </div>
        </div>
    )
}