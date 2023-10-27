import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from "react-icons/ci"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { deleteRoom, leaveRoom } from "@/redux/thunks"

export default function RoomSettings() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(s => s.user)
    const { channel } = useAppSelector(s => s.channel)



    async function handleDeleteRoom() {
        if (!user || !channel) {
            console.error('missing userData or channelData')
            return
        }
        if (user.id !== channel.makerId) {
            console.error('unauthorized')
            return
        }
        try {
            await dispatch(deleteRoom({userId: user.id, roomId: channel.id}))
            router.replace('/')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLeaveRoom() {
        if (!user || !channel) {
            console.error('missing userData or channelData')
            return 
        }
        try {
            await dispatch(leaveRoom({userId: user.id, roomId: channel.id}))
            router.replace('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center">
            <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent>            
            {
             Boolean(channel?.type === 'channel' && channel.makerId === user?.id) &&
                <DeleteChannel handleClick={handleDeleteRoom} />
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId === user?.id) &&
                <DeleteGroup handleClick={handleDeleteRoom} />
            }
            {
            Boolean(channel?.type === 'channel' && channel.makerId !== user?.id) &&
                <LeaveChannel handleClick={handleLeaveRoom} />
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId !== user?.id) &&
                <LeaveGroup handleClick={handleLeaveRoom} />
            }
                
        </DropdownMenuContent>
        </DropdownMenu>
    )
}



function DeleteChat({handleClick}: {handleClick: () => void}) {

    return (
        <DropdownMenuItem onClick={(handleClick)} className="text-red-600 focus:text-red-600 focus:bg-red-100">
            Delete Chat
        </DropdownMenuItem>
    )
}

function DeleteGroup({handleClick}: {handleClick: () => void}) {
    return (
        <DropdownMenuItem onClick={(handleClick)} className="text-red-600 focus:text-red-600 focus:bg-red-100">
            Delete Group
        </DropdownMenuItem>
    )
}

function DeleteChannel({handleClick}: {handleClick: () => void}) {
    return (
        <DropdownMenuItem onClick={(handleClick)} className="text-red-600 focus:text-red-600 focus:bg-red-100">
            Delete Channel
        </DropdownMenuItem>
    )
}

function LeaveGroup({handleClick}: {handleClick: () => void}) {
    return (
        <DropdownMenuItem onClick={(handleClick)} className="text-red-600 focus:text-red-600 focus:bg-red-100">
            Leave Group
        </DropdownMenuItem>
    )
}

function LeaveChannel({handleClick}: {handleClick: () => void}) {
    return (
        <DropdownMenuItem onClick={(handleClick)} className="text-red-600 focus:text-red-600 focus:bg-red-100">
            Leave Channel
        </DropdownMenuItem>
    )
}