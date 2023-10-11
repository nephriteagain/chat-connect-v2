"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { BiSearch, BiArrowBack } from 'react-icons/bi'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

import Settings from '@/components/Settings'
import ChatRooms from '@/components/ChatRooms'
import CreateChatRoom from '@/components/CreateChatRoom'
import AuthProvider from '@/components/AuthProvider'
import NewChannel from '@/components/NewChannel'

import { store } from '@/redux/store'
import { Provider } from 'react-redux/es/exports'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const [ inputFocused, setInputFocused ] = useState(false)
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
                    <div className='flex flex-row text-lg py-1 items-center gap-2'>
                        <div className='text-2xl p-2 rounded-full hover:bg-neutral-100'>
                            {
                                inputFocused ? 
                                <BiArrowBack /> :
                                <Settings />
                            }
                        </div>
                        <div className='relative text-lg group flex-grow'>
                            <div className='absolute left-4 top-1/2 -translate-y-1/2'>
                                <BiSearch  className={inputFocused ? 'text-blue-600' : 'text-gray-600'} />
                            </div>
                            <input 
                                type='text' 
                                placeholder='Search' 
                                className='w-full ps-10 py-2 rounded-3xl border border-slate-200 focus:outline-blue-600'
                                onFocus={() => setInputFocused(true)}                  
                                onBlur={() => setInputFocused(false)}    
                            />
                        </div>
                        
                    </div>
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
