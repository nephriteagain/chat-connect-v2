"use client"
import ChatBox from './ChatBox'
import Messages from './Messages'

import { useState, useRef } from 'react'

import type { editMode } from '@/types'

export default function Chat() {
    const [ editMode, setEditMode ] = useState<editMode>({editMode: false, message: null})
    const [ inputText, setInputText ] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    function focusInput() {
        if (inputRef.current) {
            console.log('focused')
            inputRef.current.focus()
        }
    }

    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <Messages 
                    setEditMode={setEditMode}
                    setInputText={setInputText}
                    focusInput={focusInput}
                />
                <ChatBox 
                    editMode={editMode}
                    setEditMode={setEditMode}
                    inputText={inputText}
                    setInputText={setInputText}
                    ref={inputRef}
                />
        </div>
    )
}