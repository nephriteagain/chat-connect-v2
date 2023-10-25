import { useListenUserMessages } from "@/hooks/useListenUserMessages"
import Message from "../channel/Message"

export default function UserMessages() {
    const messages = useListenUserMessages()

    return (
        <div className="flex h-[80vh] flex-col gap-2 items-center pt-4 pb-28 w-full overflow-scroll">
            {messages.map(m => {
                return <Message message={m} key={m.id} />
            })}
        </div>
    )
}
