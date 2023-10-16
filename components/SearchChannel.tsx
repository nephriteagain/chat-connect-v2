import { BiSearch, BiArrowBack } from 'react-icons/bi'

import { useState } from "react"
import { useAppDispatch } from '@/redux/hooks'
import { searchChannels } from '@/redux/thunks'

import Settings from './Settings'

export default function SearchChannel() {
    const [ inputFocused, setInputFocused ] = useState(false)
    const dispatch = useAppDispatch()

    return (
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
                                // TODO: edit this
                                onChange={(e) => dispatch(searchChannels(e.currentTarget.value))}
                            />
                        </div>                        
                    </div>
    )
}