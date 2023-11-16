import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import type { room, userData } from "@/types"

import { useGetImageURL } from "@/hooks/useGetImageURL"
import { useGetProfileURL } from "@/hooks/useGetProfileURL"
import { useMouseLoading } from "@/hooks/useMouseLoading"

import Image from "next/image"
import Link from "next/link"

export default function SearchList() {
    const { roomSearches, userSearches } = useAppSelector(s => s.rooms)

    return (
        <motion.div className="flex flex-col gap-1"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.15}}
        >
            <p className="text-sm opacity-60 italic" key={'rooms'}>rooms</p>
            <hr key={'hr-1'} />
            <RoomList rooms={roomSearches} />
            <hr key={'h2-2'} />
            <p className="text-sm opacity-60 italic" key={'users'}>users</p>
            <hr key={'hr-3'} />
            <UserList users={userSearches} />
        </motion.div>

    )
}

function RoomList({rooms}: {rooms: room[]}) {
    return (
        <>
        {rooms.map(s => {
            const { id, name, members, profile } = s
                return <RoomSearchItem 
                key={id} 
                id={id}
                name={name} 
                members={members.length} 
                profile={profile}
                />        
            })}
        </>
    )
}

function RoomSearchItem({name, members, id, profile=''}: {name: string; members: number; id: string; profile?: string}) {
    const url = typeof profile === undefined ? '' : profile

    const loading = useMouseLoading()
    

    const imageURL = useGetImageURL(url)

    return (
        <Link 
            href={`/c/${id}`}
            className="w-full p-2 flex flex-row gap-4 hover:bg-myPrimary hover:text-black rounded-lg transition-all duration-150"
            onClick={loading}
        >            
            <div className="relative w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {Boolean(imageURL) ? <Image
                    src={imageURL}
                    alt=''
                    className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                    width={300}
                    height={300}
                /> :
                name[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">{members} {members > 1 ? 'members' : 'member'}</p>
            </div>
        </Link>
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
    const { user } = useAppSelector(s => s.user)
    const router = useRouter()

    const profileURL = useGetProfileURL(id)
    const imageURL = useGetImageURL(profileURL)

    const loading = useMouseLoading()

    async function directMessage(id:string, userName:string) {
        if (user) {
            const response = await fetch('/api/user/directMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    otherUserId: id,
                    userName: user.userName,
                    otherUserName: userName
                })
            })
            if (response.status === 302) {
                loading()
                router.push(`/u/${user.id}${id}`)
            }
        }
    }

    return (
        <div className="w-full p-2 flex flex-row gap-4 hover:bg-myPrimary hover:text-black rounded-lg cursor-pointer transition-all duration-150"
            onClick={() => directMessage(id, userName)}
        >            
            <div className="relative w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {Boolean(imageURL) ? <Image
                    src={imageURL}
                    alt=''
                    className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                    width={300}
                    height={300}
                /> :
                userName[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">@{userName}</p>
            </div>
        </div>
    )
}