import UserMessages from "./UserMessages"
import UserChatBox from "./UserChatBox"

import { useState } from "react"
import type { editMode } from "@/types"

export default function UserChat() {
    const [ inputText, setInputText ] = useState('')
    const [ editMode, setEditMode ] = useState<editMode>({editMode: false, message: null})

    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <UserMessages
                    setEditMode={setEditMode} 
                    setInputText={setInputText}
                />
                <UserChatBox 
                    inputText={inputText}
                    setInputText={setInputText}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
        </div>
    )   
}