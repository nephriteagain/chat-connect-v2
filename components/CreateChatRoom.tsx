import { RiPencilFill, RiGroupLine } from "react-icons/ri"
import { PiSpeakerNoneDuotone } from 'react-icons/pi'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { Dispatch, SetStateAction } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function CreateChatRoom({setShowNewChannel}: {setShowNewChannel: Dispatch<SetStateAction<boolean>>}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger className='z-20 absolute right-4 bottom-4 p-4 aspect-square rounded-full text-2xl bg-[#3390ec] hover:bg-[#337dec] cursor-pointer'>
            <RiPencilFill className="fill-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-semibold rounded-lg">
            <DropdownMenuItem onClick={() => setShowNewChannel(true)}>
                <span className="me-4 text-lg">
                    <PiSpeakerNoneDuotone  />
                </span>
                <p>
                New Channel
                </p>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <span className="me-4 text-lg">
                    <RiGroupLine />
                </span>
                <p>
                New Group
                </p>
            </DropdownMenuItem>
            <DropdownMenuItem>
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