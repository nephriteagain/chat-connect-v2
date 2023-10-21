import CreateChatRoom from "./CreateChatRoom"
import ChatRooms from "./ChatRooms"

import { Dispatch, SetStateAction } from "react"

export default function ChatRoomUI({setShowNewChannel, setChannelType}: {setShowNewChannel: Dispatch<SetStateAction<boolean>>; setChannelType: Dispatch<SetStateAction<'channel'|'group'|'private'>>}) {
    return (
        <>
            <CreateChatRoom setShowNewChannel={setShowNewChannel} setChannelType={setChannelType} />
            <ChatRooms />
        </>
    )
}