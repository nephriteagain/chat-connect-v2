import type { message } from "@/types"
import { useGetSenderName } from "@/hooks/useGetSenderName"
import { format } from "date-fns"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,   
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { deleteMessage } from "@/redux/thunks"

export default function Message({message}: {message: message}) {
    const { id, date, sender, message: msg, flags } =  message

    const name = useGetSenderName(sender, [sender])
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(s => s.user)
    const { channel } = useAppSelector(s => s.channel)

    async function deleteMessageHandler() {
        if (!user || user.id !== sender || !channel) return
        try {
            await dispatch(deleteMessage({
                sender: sender,
                channelId: channel.id,
                messageId: id
            }))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        
        <div className="flex flex-row items-end gap-2 w-[500px]">
            <ContextMenu>
                <ContextMenuTrigger className="bg-gray-400 flex items-center justify-center text-xl p-2 rounded-full w-12 aspect-square shadow-sm">
                    {name[0]}
                </ContextMenuTrigger>
                <ContextMenuContent className="w-fit p-2">
                    <ContextMenuItem>
                        Send Message
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <ContextMenu>
                <ContextMenuTrigger className="w-fit min-w-[150px] max-w-[400px] bg-white p-2 rounded-lg shadow-sm">
                    <p className="font-semibold" >{name || sender}</p>
                    <p className={msg=== 'DELETED'? 'text-red-800 line-through': ''}>
                        {msg}
                    </p>
                    <p className="text-sm opacity-60 text-right">{format(date, 'hh:mm a')}</p>
                    {Boolean(flags?.edited) && <p className="text-right text-sm scale-90 italic opacity-60">edited</p>}
                </ContextMenuTrigger>            
                <ContextMenuContent className="w-fit p-2">
                    <ContextMenuItem>
                        Edit Message    
                    </ContextMenuItem>
                    <ContextMenuItem 
                        className="text-red-600 focus:bg-red-200 focus:text-red-800"
                        onClick={deleteMessageHandler}
                    >
                        Delete Message
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
        
    )
}