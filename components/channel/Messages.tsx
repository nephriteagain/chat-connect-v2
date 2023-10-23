import { format } from "date-fns"
import { useGetSenderName } from "@/hooks/useGetSenderName"
import { useListenMessages } from "@/hooks/useListenMessages"

import type { message } from "@/types"
export default function Messages() {
    const messages = useListenMessages()

        
    return (
        <div className="flex h-[80vh] flex-col gap-2 items-center pt-4 pb-28 w-full overflow-scroll">
            {messages.map(m => {
                return <Message message={m} key={m.id} />
            })}
        </div>
    )
}

export function Message({message}: {message: message}) {
    const { id, date, sender, message: msg } =  message

    const name = useGetSenderName(sender, [sender])

    return (
        <div className="flex flex-row items-end gap-2 w-[500px]">
            <div className="bg-gray-400 flex items-center justify-center text-xl p-2 rounded-full w-12 aspect-square shadow-sm">
                {name[0]}
            </div>
            <div className="w-fit min-w-[150px] max-w-[400px] bg-white p-2 rounded-lg shadow-sm">
                <p className="font-semibold" >{name || sender}</p>
                <p>{msg}</p>
                <p className="text-sm opacity-60 text-right">{format(date, 'hh:mm a')}</p>
            </div>
            
        </div>
    )
}