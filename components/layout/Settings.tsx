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

import { useRouter } from "next/navigation"

export default function Settings({setShowProfile}: {setShowProfile: ReactDispatch<boolean>}) {
    const router = useRouter()

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center">
            <RxHamburgerMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowProfile(true)}>
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => {
                signOut(auth)
                router.push('/')
            }}
                className="text-red-600 focus:bg-red-100 focus:text-red-800"
            >
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

