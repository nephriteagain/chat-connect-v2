import { BiSearch, BiArrowBack, BiSolidSend } from 'react-icons/bi'

import {  Dispatch, ForwardedRef, SetStateAction, } from "react"
import { useAppDispatch } from '@/redux/hooks'
import { searchChannels } from '@/redux/thunks'
import Settings from './Settings'
import { forwardRef } from 'react'



export default forwardRef(function SearchChannel(
    {inputFocused, setInputFocused, inputVal, setInputVal}: 
    {inputFocused: boolean; setInputFocused: Dispatch<SetStateAction<boolean>>; inputVal: string; setInputVal: Dispatch<SetStateAction<string>>}, 
    ref: ForwardedRef<HTMLInputElement>) {

    const dispatch = useAppDispatch()

    function handleSearch(query:string) {
        dispatch(searchChannels(query))
    }


    

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSearch(inputVal)
        }}>
        <div className='flex flex-row text-lg py-1 items-center gap-1'>
            <div className='text-2xl p-2 rounded-full hover:bg-neutral-100'
                onClick={() => {
                    if (inputVal.length > 0) {
                        setInputVal('')
                    }
                }}
            >
                {
                    (inputFocused || inputVal.length > 0) ? 
                    <BiArrowBack /> :
                    <Settings />
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
                    className='w-full ps-10 py-2 rounded-3xl border border-slate-200 focus:outline-blue-600'
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
                className='p-2 hover:bg-neutral-200 rounded-full text-2xl'
            >
                <BiSolidSend className="fill-blue-400" />
            </button>
        </div>
        </form>
    )
})