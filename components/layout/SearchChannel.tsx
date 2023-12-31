import { BiSearch, BiArrowBack, BiSolidSend } from 'react-icons/bi'

import { ForwardedRef, useState } from "react"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { searchChannels } from '@/redux/thunks'
import Settings from './Settings'
import { forwardRef } from 'react'

import { ReactDispatch } from '@/types'

import Loader from '../common/Loader'


export default forwardRef(function SearchChannel(
    {inputFocused, setInputFocused, inputVal, setInputVal, setShowProfile}: {
    inputFocused: boolean; 
    setInputFocused: ReactDispatch<boolean>; 
    inputVal: string; 
    setInputVal: ReactDispatch<string>; 
    setShowProfile: ReactDispatch<boolean> },
    ref: ForwardedRef<HTMLInputElement>) {

    const [ isLoading, setIsLoading ] = useState(false)

    const dispatch = useAppDispatch()
    const { user } = useAppSelector(s => s.user)

    async function handleSearch(query:string) {
        if (!user) return
        try {
            setIsLoading(true)
            await dispatch(searchChannels({q:query, id:user.id}))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSearch(inputVal)
        }}>
        <div className='flex flex-row text-lg py-1 items-center gap-1'>
            <div className='text-2xl p-2 rounded-full text-myAccent hover:bg-mySecondary transition-all duration-150'
                onClick={() => {
                    if (inputVal.length > 0) {
                        setInputVal('')
                    }
                }}
            >
                {
                    (inputFocused || inputVal.length > 0) ? 
                    <BiArrowBack /> :
                    <Settings  setShowProfile={setShowProfile} />
                }
            </div>
            <div className='relative text-lg group flex-grow'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2'>
                    <BiSearch  className={inputFocused ? 'text-blue-600' : 'text-gray-600'} />
                </div>
                <input 
                    id='search'
                    type='text' 
                    placeholder='Search' 
                    className='bg-mySecondary w-full placeholder:text-myText ps-10 py-2 rounded-3xl focus:outline-blue-600'
                    onFocus={() => setInputFocused(true)}                  
                    onBlur={() => setInputFocused(false)}
                    // TODO: edit this
                    onChange={(e) => {
                        const text=  e.currentTarget.value
                        setInputVal(text)
                    }}
                    ref={ref}
                    value={inputVal}
                    
                />
            </div>
            <button 
                type='submit' 
                className='p-2 hover:bg-mySecondary rounded-full text-2xl transition-all duration-150'
                disabled={isLoading}
            >
                <Loader isLoading={isLoading} className='fill-myAccent'>
                    <BiSolidSend className="fill-myAccent" />
                </Loader>
            </button>
        </div>
        </form>
    )
})