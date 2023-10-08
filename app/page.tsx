import { BiSearch } from 'react-icons/bi'
import { MdVoiceChat } from 'react-icons/md'
import { CiMenuKebab } from 'react-icons/ci'
import { FaRegSmile, FaMicrophone } from 'react-icons/fa'
import { TbPaperclip } from 'react-icons/tb'

export default function Home() {
    return (
        <main className='w-full h-screen flex flex-col'>
            <Header channelName='kidneygod' memberCount={10_000} />
            <Chat />
        </main>
    )
}

function Chat() {
    return (
        <div className="relative flex-grow bg-slate-300 w-full">
            <div className='absolute flex flex-row bottom-6 left-1/2 -translate-x-1/2 gap-2'>
                <div className='relative'>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <FaRegSmile   />
                    </span>
                    <input 
                        type='text' 
                        className='px-12 py-4 w-[450px] focus:outline-none rounded-lg shadow-md drop-shadow-md' 
                        placeholder='Message'
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-20 text-2xl rounded-full p-1 hover:bg-neutral-200">
                        <TbPaperclip   />
                    </span>
                </div>                
                <div className='bg-[#3390ec] rounded-full  flex items-center justify-center p-4 text-white text-xl cursor-pointer hover:bg-[#334cec]'>
                        <FaMicrophone />
                </div>
            </div>
        </div>
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
