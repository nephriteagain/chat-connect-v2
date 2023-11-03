import CreateChatRoom from "./CreateChatRoom"
import ChatRooms from "./ChatRooms"
import { motion } from "framer-motion";

import { ReactDispatch } from "@/types";

export default function ChatRoomUI({
    setShowNewChannel, setChannelType, setShowInvite}: {
        setShowNewChannel: ReactDispatch<boolean>; 
        setChannelType: ReactDispatch<'channel'|'group'|'private'>
        setShowInvite: ReactDispatch<boolean>;
    }) {
    return (
        <motion.div className="w-full h-full"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.15}}
        >
            <CreateChatRoom 
                setShowNewChannel={setShowNewChannel} 
                setChannelType={setChannelType}
                setShowInvite={setShowInvite}
            />
            <ChatRooms />
        </motion.div>
    )
}