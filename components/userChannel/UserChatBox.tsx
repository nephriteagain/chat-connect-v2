import { FaRegSmile, FaMicrophone } from 'react-icons/fa'
import { TbPaperclip } from 'react-icons/tb'
import { BiSolidSend } from 'react-icons/bi'
import { HiOutlinePencil } from 'react-icons/hi'
import { RxCross1 } from 'react-icons/rx'

import {  FormEvent, forwardRef, ForwardedRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sendPrivateMessage, editPrivateMessage } from '@/redux/thunks'
import { useParams } from 'next/navigation'

import type { editMode, ReactDispatch } from '@/types'

import MessageInput from '../channel/MessageInput'

// TODO find the bug here
export default forwardRef(function UserChatBox({editMode, setEditMode, inputText, setInputText}: {
    editMode:editMode;setEditMode: ReactDispatch<editMode>
    inputText: string; setInputText: ReactDispatch<string>
}, ref: ForwardedRef<HTMLInputElement>) {
    const { channel } = useParams()

    const { user } = useAppSelector(s => s.user)
    const { userData } = useAppSelector(s => s.userChannel)

    const dispatch = useAppDispatch()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log('sending message')
        if (inputText.length === 0 || !user || !userData || typeof channel !== 'string') {
            console.log('message send failed')
            return
        }
        const selfId = user.id
        const receiverId = channel.substring(selfId.length)
        if (!editMode.editMode) {
            console.log('normal mode')
            try {
                await dispatch(sendPrivateMessage({
                    senderId: user.id, 
                    receiverId,
                    message: inputText
                }))
                setInputText("")
                console.log('message sent')

            } catch (error) {
                console.error(error)   
            }
            return
        }

        if (!editMode.message) {
            console.log('send failed')
            return
        }

        console.log('edit mode')
        try {
            await dispatch(editPrivateMessage({
                sender: editMode.message.sender,
                receiver: receiverId,
                message: inputText,
                messageId: editMode.message.id,
                senderId: user.id
            }))
            setEditMode({editMode: false, message: null})
            setInputText('')
        } catch (error) {
            console.error('error')            
        }
        
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
                            <div className="text-xl ms-auto opacity-60 hover:bg-neutral-200 rounded-full p-2"
                                onClick={() => {
                                    setEditMode({editMode: false, message: null})
                                    setInputText('')
                                }}
                            >
                            <RxCross1/>
                            </div>
                    </div>}
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <FaRegSmile   />
                    </span>
                    <MessageInput 
                        onChange={setInputText}
                        inputText={inputText}
                        editMode={editMode}
                        ref={ref}
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
})