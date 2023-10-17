"use client"
import Header from '@/components/Header'

import Chat from '@/components/Chat'

export default function Home() {
    return (
        <main className='w-full h-screen flex flex-col'>
                <Header />
                <Chat />            
        </main>
    )
}




