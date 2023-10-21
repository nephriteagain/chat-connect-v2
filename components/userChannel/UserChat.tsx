import UserMessages from "./UserMessages"
import UserChatBox from "./UserChatBox"


export default function UserChat() {
    return (
        <div className="relative flex-grow w-full bg-slate-300 flex flex-col items-center">
                <UserMessages />
                <UserChatBox />
        </div>
    )   
}