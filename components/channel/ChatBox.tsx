import { FaRegSmile, FaMicrophone } from 'react-icons/fa'
import { TbPaperclip } from 'react-icons/tb'
import { BiSolidSend } from 'react-icons/bi'
import { HiOutlinePencil } from 'react-icons/hi'
import { RxCross1 } from 'react-icons/rx'

import { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sendMessage, editMessage } from '@/redux/thunks'


import type { editMode, ReactDispatch } from '@/types'

export default function ChatBox({editMode, setEditMode, inputText, setInputText}: {
    editMode:editMode;setEditMode: ReactDispatch<editMode>
    inputText: string; setInputText: ReactDispatch<string>
}) {

    const { user } = useAppSelector(s => s.user)
    const { channel } = useAppSelector(s => s.channel)

    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (inputText.length === 0 || !user || !channel) return;
        if (!editMode) {
            try {            
                await dispatch(sendMessage({
                    sender: user.id, 
                    channelId: channel.id,
                    message: inputText
                }))
                setInputText("")
            } catch (error) {
                console.error(error)   
            }
            return
        }
        try {
            if (!user || !editMode.message) return
            await dispatch(editMessage({
                userId: user.id,
                roomId: channel.id,
                message: editMode.message.id,
                newMessage: inputText,
                sender: editMode.message.sender
            }))
            setEditMode({editMode: false, message: null})
        } catch (error) {
            console.error(error)
        }
       
    }
    // only the channel creator can message in a room with type channel
    if (channel?.type === 'channel' && channel?.makerId !== user?.id) {
        return null
    }

    // if you did not join the channel you cannot message
    if (!user?.channels.some(c => c === channel?.id)) {
        return null
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-row gap-2'>
                <div className='relative'>
                    {editMode?.editMode && <div className='absolute -top-full h-full flex flex-row gap-3 items-center  bg-white w-[450px] px-4 py-3 rounded-t-lg shadow-md'>
                        <HiOutlinePencil className="text-2xl stroke-blue-600" />
                        <span className='border-r-2 border-blue-600 h-full' />
                        <div className='text-sm'>
                            <p className='text-blue-600'>Editing</p>
                            <p className='opacity-60'>{editMode?.message?.message || 'test'}</p>
                        </div>
                        <button className="text-xl ms-auto opacity-60 hover:bg-neutral-200 rounded-full p-2"
                            onClick={() => setEditMode({editMode: false, message:null})}
                        >
                        <RxCross1/>
                        </button>
                    </div>}
                    <span className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <FaRegSmile   />
                    </span>
                    <input 
                        type='text' 
                        className={`px-12 py-4 w-[450px] focus:outline-none shadow-md drop-shadow-md ${editMode.editMode ? 'rounded-b-lg' : 'rounded-lg'} transition-all duration-150`} 
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