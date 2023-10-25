import { format } from "date-fns"
import { useGetSenderName } from "@/hooks/useGetSenderName"
import { useListenMessages } from "@/hooks/useListenMessages"

import Message from "./Message"

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

