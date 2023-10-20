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


    async function handleClick() {
        if (!user || !channel) return
        if ((channel.type === 'channel'||channel.type === 'group') && 
            user.id === channel.makerId) {
            try {
                await dispatch(deleteRoom({userId: user.id, roomId: channel.id}))
                router.replace('/')
            } catch (error) {
                console.error(error    )
            }
        }
        if ((channel.type === 'channel'||channel.type === 'group') && 
            user.id !== channel.makerId) {
            try {
                await dispatch(leaveRoom({userId: user.id, roomId: channel.id}))                    
                router.replace('/')
            } catch (error) {
                console.error(error)
            }
        }

    }

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center">
            <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>coming soon...</DropdownMenuItem>
            <DropdownMenuItem>coming soon...</DropdownMenuItem>
            <DropdownMenuItem>coming soon...</DropdownMenuItem>
            <DropdownMenuItem>coming soon...</DropdownMenuItem>
            {
             Boolean(channel?.type === 'channel' && channel.makerId === user?.id) &&
                <DeleteChannel handleClick={handleClick} />
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId === user?.id) &&
                <DeleteGroup handleClick={handleClick} />
            }
            {
            Boolean(channel?.type === 'channel' && channel.makerId !== user?.id) &&
                <LeaveChannel handleClick={handleClick} />
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId !== user?.id) &&
                <LeaveGroup handleClick={handleClick} />
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