import { FaRegSmile, FaMicrophone } from 'react-icons/fa'
import { TbPaperclip } from 'react-icons/tb'
import { BiSolidSend } from 'react-icons/bi'

import { useState, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sendMessage } from '@/redux/thunks'

export default function ChatBox() {
    const [ inputText, setInputText ] = useState('')

    const { user } = useAppSelector(s => s.user)
    const { channel } = useAppSelector(s => s.channel)

    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (inputText.length === 0 || !user || !channel) return;
        try {
            await dispatch(sendMessage({
                sender: user.id, 
                channelId: channel.id,
                message: inputText
            }))
            setInputText("")
        } catch (error) {
            console.error(error)   
        }  finally {
            
        }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-row gap-2'>
                <div className='relative'>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <FaRegSmile   />
                    </span>
                    <input 
                        type='text' 
                        className='px-12 py-4 w-[450px] focus:outline-none rounded-lg shadow-md drop-shadow-md' 
                        placeholder='Message'
                        onChange={(e) => setInputText(e.currentTarget.value)}
                        value={inputText}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        
                        <TbPaperclip   />
                    </span>
                </div>                
                <button type='submit' className='bg-[#3390ec] rounded-full  flex items-center justify-center p-4 text-white text-xl cursor-pointer hover:bg-[#334cec]'
                >
                    {
                        inputText.length === 0 ?
                        <FaMicrophone /> :
                        <BiSolidSend />
                    }
                </button>
            </form>
        </div>
    )
}