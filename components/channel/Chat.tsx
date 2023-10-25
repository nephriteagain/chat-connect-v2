"use client"
import ChatBox from './ChatBox'
import Messages from './Messages'

import { useState } from 'react'

import type { editMode } from '@/types'

export default function Chat() {
    const [ editMode, setEditMode ] = useState<editMode>({editMode: false, message: null})
    const [ inputText, setInputText ] = useState('')

    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <Messages 
                    setEditMode={setEditMode}
                    setInputText={setInputText}
                />
                <ChatBox 
                    editMode={editMode}
                    setEditMode={setEditMode}
                    inputText={inputText}
                    setInputText={setInputText}
                />
        </div>
    )
}