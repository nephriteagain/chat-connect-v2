"use client"
import UserHeader from "@/components/userChannel/UserHeader"
import UserChat from "@/components/userChannel/UserChat"

export default function Page() {


    return (
        <main className='w-full h-screen flex flex-col'>
                <UserHeader />
                <UserChat />
        </main>
    )
}