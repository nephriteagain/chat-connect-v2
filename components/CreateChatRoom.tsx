import { RiPencilFill, RiGroupLine } from "react-icons/ri"
import { PiSpeakerNoneDuotone } from 'react-icons/pi'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { Dispatch, SetStateAction, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function CreateChatRoom({setShowNewChannel, setChannelType}: {setShowNewChannel: Dispatch<SetStateAction<boolean>>; setChannelType: Dispatch<SetStateAction<'channel'|'group'|'private'>>}) {

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className='z-20 absolute right-4 bottom-4 p-4 aspect-square rounded-full text-2xl bg-[#3390ec] hover:bg-[#337dec] cursor-pointer'>
            <RiPencilFill className="fill-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-semibold rounded-lg">
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