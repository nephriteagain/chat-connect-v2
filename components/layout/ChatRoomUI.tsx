import CreateChatRoom from "./CreateChatRoom"
import ChatRooms from "./ChatRooms"

import { ReactDispatch } from "@/types";

export default function ChatRoomUI({
    setShowNewChannel, setChannelType, setShowInvite}: {
        setShowNewChannel: ReactDispatch<boolean>; 
        setChannelType: ReactDispatch<'channel'|'group'|'private'>
        setShowInvite: ReactDispatch<boolean>;
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