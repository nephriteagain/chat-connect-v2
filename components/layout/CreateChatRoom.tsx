import { RiPencilFill, RiGroupLine } from "react-icons/ri"
import { PiSpeakerNoneDuotone } from 'react-icons/pi'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { ReactDispatch } from "@/types"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function CreateChatRoom({
    setShowNewChannel, setChannelType, setShowInvite}: {
    setShowNewChannel: ReactDispatch<boolean>; 
    setChannelType: ReactDispatch<'channel'|'group'|'private'>
    setShowInvite: ReactDispatch<boolean>;
    }) {

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className='z-20 absolute right-4 bottom-4 p-4 aspect-square rounded-full text-2xl bg-myAccent hover:bg-myPrimary cursor-pointer transition-all duration-150'>
            <RiPencilFill className="fill-mySecondary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-semibold rounded-lg bg-mySecondary text-myText">
            <DropdownMenuItem onClick={() => {
                setShowNewChannel(true)
                setChannelType('channel')
                }}>
                <span className="me-4 text-lg">
                    <PiSpeakerNoneDuotone  />
                </span>
                <p>
                New Channel
                </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                setShowNewChannel(true)
                setChannelType('group')
                }}>
                <span className="me-4 text-lg">
                    <RiGroupLine />
                </span>
                <p>
                New Group
                </p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                setShowNewChannel(true)
                setChannelType('private')
                setShowInvite(true)
            }}>
                <span className="me-4 text-lg">
                    <MdOutlinePersonOutline />
                </span>
                <p>
                New Private Chat
                </p>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}