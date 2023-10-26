"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useState, useRef,   } from 'react'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })


import AuthProvider from '@/components/layout/AuthProvider'
import NewChannel from '@/components/layout/NewChannel'
import SearchChannel from '@/components/layout/SearchChannel'
import ChatRoomUI from '@/components/layout/ChatRoomUI'
import SearchListUI from '@/components/layout/SearchListUI'
import Profile from '@/components/layout/Profile'

import { store } from '@/redux/store'
import { Provider } from 'react-redux/es/exports'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const [ showNewChannel, setShowNewChannel ] = useState(false)
    const [ showInvite, setShowInvite ] = useState(false)
    const [ inputFocused, setInputFocused ] = useState(false)
    const [ inputVal, setInputVal ] = useState('')
    const [ channelType, setChannelType ] = useState<'channel'|'group'|'private'>('group')
    const [ showProfile, setShowProfile ] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)


    
    return (
      

        <html lang="en">
          <Provider store={store}>
            <AuthProvider>
            <body className={`${inter.className} flex flex-row overflow-y-hidden`}>
                <nav className='relative w-[420px] h-screen px-1 border border-slate-300 overflow-x-hidden'>
                    <AnimatePresence>
                    { showNewChannel && 
                        <NewChannel 
                          setShowNewChannel={setShowNewChannel} 
                          channelType={channelType} 
                          showInvite={showInvite} 
                          setShowInvite={setShowInvite} 
                    /> }
                    </AnimatePresence>
                    <AnimatePresence>
                      { showProfile &&
                        <Profile setShowProfile={setShowProfile} />
                      }
                    </AnimatePresence>
                    <SearchChannel                        
                      inputFocused={inputFocused} 
                      setInputFocused={setInputFocused}  
                      ref={inputRef}     
                      inputVal={inputVal}                
                      setInputVal={setInputVal}
                      setShowProfile={setShowProfile}
                    />
                    
                    <div>
                        {
                        (inputFocused || inputVal.length > 0) ? 
                        <SearchListUI /> :
                        <ChatRoomUI 
                          setShowNewChannel={setShowNewChannel} 
                          setChannelType={setChannelType} 
                          setShowInvite={setShowInvite}
                        />
                        }
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
