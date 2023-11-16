import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from "react-icons/ci"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { deleteRoom, leaveRoom } from "@/redux/thunks"

import DestructiveOption from "./DestructiveOption"

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
        <DropdownMenuTrigger className="aspect-square p-2 hover:bg-myAccent rounded-full flex items-center justify-center transition-all duration-150">
            <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-mySecondary border-myAccent">   
            {
            Boolean(channel?.type === 'channel' && channel.makerId === user?.id) &&
                <DestructiveOption onClick={handleDeleteRoom} name={channel?.name}>
                    Delete Channel
                </DestructiveOption>
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId === user?.id) &&
                <DestructiveOption onClick={handleDeleteRoom} name={channel?.name}>
                    Delete Group
                </DestructiveOption>
            }
            {
            Boolean(channel?.type === 'channel' && channel.makerId !== user?.id) &&
                <DestructiveOption onClick={handleLeaveRoom}>
                    Leave Channel
                </DestructiveOption>
            }
            {
            Boolean(channel?.type === 'group' && channel.makerId !== user?.id) &&
                <DestructiveOption onClick={handleLeaveRoom}>
                    Leave Group
                </DestructiveOption>
            }                
            
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

