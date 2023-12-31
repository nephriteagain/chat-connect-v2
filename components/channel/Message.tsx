import type { message } from "@/types"
import { useGetSenderName } from "@/hooks/useGetSenderName"
import { useGetProfileURL } from "@/hooks/useGetProfileURL"
import { useGetImageURL } from "@/hooks/useGetImageURL"
import { useMouseLoading } from "@/hooks/useMouseLoading"
import { format } from "date-fns"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,   
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { deleteMessage,deletePrivateMessage } from "@/redux/thunks"
import { usePathname, useRouter } from "next/navigation"
import type { ReactDispatch, editMode } from "@/types"
import Image from "next/image"

import { motion } from "framer-motion"

export default function Message({message, setEditMode, setInputText, focusInput}: {
    message: message; 
    setEditMode:ReactDispatch<editMode>;
    setInputText: ReactDispatch<string>;
    focusInput: () => void
}) {
    const { id, date, sender, message: msg, flags } =  message
    const path = usePathname()
    const router = useRouter()

    const name = useGetSenderName(sender, [sender])
    const profileURL = useGetProfileURL(sender)
    const imageURL = useGetImageURL(profileURL)
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(s => s.user)
    const { channel } = useAppSelector(s => s.channel)
    const { userData } = useAppSelector(s => s.userChannel)
    
    const loading = useMouseLoading()

    async function deleteMessageHandler() {
        

        const regex = /^\/c\/.*/;

        if (regex.test(path)) {
            if (!user || user.id !== sender || !channel) {
                console.log("missing args")
                return
            }
            try {
                await dispatch(deleteMessage({
                    sender: sender,
                    channelId: channel.id,
                    messageId: id
                }))
            } catch (error) {
                console.error(error)
            }
            return
        }
        if (!userData || !user || sender !== user.id) return        
        try {
            await dispatch(deletePrivateMessage({
                sender: user.id,
                receiver: userData.id,
                messageId: id
            }))
        } catch (error) {
            console.error(error)
        }
      
    }

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
        
        <motion.div 
            className=" flex flex-row items-end gap-2 w-full px-4 sm:px-0 sm:w-[500px]"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration: 0.2}}
        >
            <ContextMenu>
                <ContextMenuTrigger className="relative bg-gray-400 flex items-center justify-center text-xl p-2 rounded-full w-12 aspect-square shadow-sm cursor-pointer">
                    {Boolean(imageURL) ? <Image
                        src={imageURL}
                        alt=''
                        className="absolute w-full h-full rounded-full shadow-sm drop-shadow-sm"
                        width={200}
                        height={200}
                        /> :
                    name[0]}
                </ContextMenuTrigger>
                { user?.id !== sender && <ContextMenuContent className="w-fit p-2 bg-mySecondary text-myText border-myAccent">
                    <ContextMenuItem onClick={() => directMessage(sender, userData?.userName as string)}>
                        Send Message
                    </ContextMenuItem>
                </ContextMenuContent>}
            </ContextMenu>
            <ContextMenu>
                <ContextMenuTrigger className="w-fit min-w-[150px] max-w-[400px] bg-myBackground p-2 rounded-lg shadow-sm">
                    <p className="font-semibold" >{name || sender}</p>
                    <p className={(Boolean(flags?.deleted))? 'text-red-500 line-through': ''}>
                        {msg}
                    </p>
                    <p className="text-sm opacity-60 text-right">{format(date, 'hh:mm a')}</p>
                    {Boolean(flags?.edited) && <p className="text-right text-sm scale-90 italic opacity-60">edited</p>}
                </ContextMenuTrigger>            
                {user?.id === sender && <ContextMenuContent className={`w-fit p-2 ${Boolean(flags?.deleted)? 'hidden': ''} bg-mySecondary text-myText border-myAccent`}>
                    <ContextMenuItem onClick={() => {
                        setEditMode({editMode: true, message})
                        setInputText(msg)
                        setTimeout(() => {
                            focusInput()
                        },100)
                    }}>
                        Edit Message    
                    </ContextMenuItem>
                    <ContextMenuItem 
                        className="text-red-200 focus:text-red-600 focus:bg-red-200"
                        onClick={deleteMessageHandler}
                    >
                        Delete Message
                    </ContextMenuItem>
                </ContextMenuContent>}
            </ContextMenu>
        </motion.div>
        
    )
}