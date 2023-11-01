"use client"
import UserHeader from "@/components/userChannel/UserHeader"
import UserChat from "@/components/userChannel/UserChat"

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {

    const router = useRouter()
    const [ isShowChat, setIsShowChat ] = useState(true)


    function hideChat() {
        setIsShowChat(false)
        setTimeout(() => {
            router.push('/')
        }, 400)
    }

    return (
        <AnimatePresence>
        { isShowChat && <motion.main className='z-[322] sm:static absolute top-0 left-0 sm:w-full w-screen h-screen flex flex-col'
                initial={{x:'100vw'}}
                animate={{x: 0}}
                exit={{x: '100vw'}}
                transition={{duration: 0.4, ease: 'easeInOut'}}
            >            
                <UserHeader hideChat={hideChat} />
                <UserChat />                        
        </motion.main> }
        </AnimatePresence>
    )
}