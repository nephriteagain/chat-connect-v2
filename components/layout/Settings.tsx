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

export default function Settings() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
            <RxHamburgerMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut(auth)}>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

