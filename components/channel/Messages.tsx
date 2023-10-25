import { useListenMessages } from "@/hooks/useListenMessages"

import Message from "./Message"

import type { editMode, ReactDispatch } from "@/types"

export default function Messages({setEditMode,setInputText}: {setEditMode:ReactDispatch<editMode>; setInputText:ReactDispatch<string>}) {
    const messages = useListenMessages()

        
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

