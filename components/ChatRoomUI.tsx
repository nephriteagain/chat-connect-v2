import CreateChatRoom from "./CreateChatRoom"
import ChatRooms from "./ChatRooms"

import { Dispatch, SetStateAction } from "react"

export default function ChatRoomUI({setShowNewChannel}: {setShowNewChannel: Dispatch<SetStateAction<boolean>>}) {
    return (
        <>
            <CreateChatRoom setShowNewChannel={setShowNewChannel} />
            <ChatRooms />
        </>
    )
}