import UserMessages from "./UserMessages"
import UserChatBox from "./UserChatBox"

import { useState, useRef } from "react"
import type { editMode } from "@/types"

export default function UserChat() {
    const [ inputText, setInputText ] = useState('')
    const [ editMode, setEditMode ] = useState<editMode>({editMode: false, message: null})

    const inputRef = useRef<HTMLInputElement>(null)

    function focusInput() {
        if (inputRef.current) {
            console.log('focused')
            inputRef.current.focus()
        }
    }


    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <UserMessages
                    setEditMode={setEditMode} 
                    setInputText={setInputText}
                    focusInput={focusInput}
                />
                <UserChatBox 
                    inputText={inputText}
                    setInputText={setInputText}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    ref={inputRef}
                />
        </div>
    )   
}