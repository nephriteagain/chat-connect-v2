import { BiSearch, BiArrowBack } from 'react-icons/bi'

import { Dispatch, ForwardedRef, SetStateAction } from "react"
import { useAppDispatch } from '@/redux/hooks'
import { searchChannels } from '@/redux/thunks'
import Settings from './Settings'
import { forwardRef } from 'react'

function withDelay(fn: (arg:any) => any) {    
    let running = false
    let timeout : any;

    return function (arg:any) {
        if (running === true) {
            clearTimeout(timeout)
        }        
        running = true
        timeout = setTimeout(() => {
            running = false
            fn(arg)
        }, 300)
                
    }
}   

export default forwardRef(function SearchChannel(
    {inputFocused, setInputFocused, inputVal, setInputVal}: 
    {inputFocused: boolean; setInputFocused: Dispatch<SetStateAction<boolean>>; inputVal: string; setInputVal: Dispatch<SetStateAction<string>>}, 
    ref: ForwardedRef<HTMLInputElement>) {
    const dispatch = useAppDispatch()
    
    function handleSearch(query:string) {
        dispatch(searchChannels(query))
    }
    const delayedDSearch = withDelay(handleSearch)

    return (
        <div className='flex flex-row text-lg py-1 items-center gap-2'>
                        <div className='text-2xl p-2 rounded-full hover:bg-neutral-100'
                            onClick={() => {
                                if (inputVal.length > 0) {
                                    setInputVal('')
                                }
                            }}
                        >
                            {
                                (inputFocused || Boolean(inputVal)) ? 
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
                                // TODO: edit this
                                onChange={(e) => {
                                    setInputVal(e.currentTarget.value)
                                    delayedDSearch(e.currentTarget.value)
                                }}
                                ref={ref}
                                value={inputVal}
                                
                            />
                        </div>                        
                    </div>
    )
})