import CreateChatRoom from "./CreateChatRoom"
import ChatRooms from "./ChatRooms"

import { Dispatch, SetStateAction } from "react"

export default function ChatRoomUI({
    setShowNewChannel, setChannelType, setShowInvite}: {
        setShowNewChannel: Dispatch<SetStateAction<boolean>>; 
        setChannelType: Dispatch<SetStateAction<'channel'|'group'|'private'>>
        setShowInvite: Dispatch<SetStateAction<boolean>>;
    }) {
    return (
        <>
            <CreateChatRoom 
                setShowNewChannel={setShowNewChannel} 
                setChannelType={setChannelType}
                setShowInvite={setShowInvite}
            />
            <ChatRooms />
        </>
    )
}