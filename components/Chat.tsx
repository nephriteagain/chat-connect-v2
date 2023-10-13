"use client"
import ChatBox from './ChatBox'
import Messages from './Messages'


export default function Chat() {

    return (
        <div className="relative flex-grow bg-slate-300 w-full">
            <Messages />
            <ChatBox />
        </div>
    )
}