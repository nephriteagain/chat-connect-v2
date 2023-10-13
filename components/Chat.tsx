"use client"
import ChatBox from './ChatBox'
import Messages from './Messages'


export default function Chat() {

    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <Messages />
                <ChatBox />
        </div>
    )
}