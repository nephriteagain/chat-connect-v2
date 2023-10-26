import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RxHamburgerMenu } from 'react-icons/rx'

import { signOut } from "firebase/auth"
import { auth } from "@/db/firebase"
import { ReactDispatch } from "@/types"

export default function Settings({setShowProfile}: {setShowProfile: ReactDispatch<boolean>}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
            <RxHamburgerMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowProfile(true)}>
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut(auth)}>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

