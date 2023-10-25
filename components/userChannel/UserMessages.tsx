import { useListenUserMessages } from "@/hooks/useListenUserMessages"
import Message from "../channel/Message"
import type { ReactDispatch, editMode } from "@/types";

export default function UserMessages({setEditMode,setInputText}: {setEditMode:ReactDispatch<editMode>; setInputText:ReactDispatch<string>}) {
    const messages = useListenUserMessages()

    return (
        <div className="flex h-[80vh] flex-col gap-2 items-center pt-4 pb-28 w-full overflow-scroll">
            {messages.map(m => {
                return <Message 
                    message={m} 
                    key={m.id}
                    setEditMode={setEditMode}  
                    setInputText={setInputText}
                />
            })}
        </div>
    )
}
