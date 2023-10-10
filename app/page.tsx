import { BiSearch } from 'react-icons/bi'
import { MdVoiceChat } from 'react-icons/md'
import { CiMenuKebab } from 'react-icons/ci'

import Chat from '@/components/Chat'

export default function Home() {
    return (
        <main className='w-full h-screen flex flex-col'>
            <Header channelName='kidneygod' memberCount={10_000} />
            <Chat />
        </main>
    )
}



function Header({channelName, memberCount}: {channelName: string; memberCount: number}) {
  return (
    <div className="py-1 px-4 flex flex-row items-center gap-2 border-b border-slate-300 shadow-sm drop-shadow-sm">
        <div className="w-[45px] aspect-square rounded-full bg-green-500 flex items-center justify-center text-white">K
        </div>
        <div className='me-auto'>
            <p className='font-semibold'>
            {channelName}
            </p>
            <p className='text-sm font-light opacity-80'>
            {memberCount} members
            </p>
        </div>
        <div className='flex flex-row gap-2 text-2xl'>
            <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                <MdVoiceChat />              
            </span>
            <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                <BiSearch />
            </span>            
            <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                <CiMenuKebab />    
            </span>
        </div>
    </div>
  )
}
