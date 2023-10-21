"use client"
import Header from '@/components/channel/Header'

import Chat from '@/components/channel/Chat'

export default function Home() {
    return (
        <main className='w-full h-screen flex flex-col'>
                <Header />
                <Chat />            
        </main>
    )
}




