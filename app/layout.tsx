"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

import ChatRooms from '@/components/ChatRooms'
import CreateChatRoom from '@/components/CreateChatRoom'
import AuthProvider from '@/components/AuthProvider'
import NewChannel from '@/components/NewChannel'
import SearchChannel from '@/components/SearchChannel'

import { store } from '@/redux/store'
import { Provider } from 'react-redux/es/exports'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const [ showNewChannel, setShowNewChannel ] = useState(false)

    return (
      

        <html lang="en">
          <Provider store={store}>
        <AuthProvider>
            <body className={`${inter.className} flex flex-row overflow-y-hidden`}>
                <nav className='relative w-[420px] h-screen px-1 border border-slate-300 overflow-x-hidden'>
                    <AnimatePresence>
                    { showNewChannel && <NewChannel setShowNewChannel={setShowNewChannel} /> }
                    </AnimatePresence>
                    <SearchChannel />
                    <div>
                        <CreateChatRoom setShowNewChannel={setShowNewChannel} />
                        <ChatRooms />
                    </div>
                </nav>
                <div className='flex-grow'>
                    {children}
                </div>
            </body>
            </AuthProvider>
          </Provider>
        </html>
        
    )
}
