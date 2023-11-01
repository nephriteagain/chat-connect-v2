import { BiSearch, BiArrowBack } from 'react-icons/bi'
import { useParams } from 'next/navigation';
import { useGetUserData } from '@/hooks/useGetUserData';
import { useAppSelector } from '@/redux/hooks';


export default function UserHeader({hideChat}:{hideChat: () => void}) {
    const { channel }  = useParams()
    const { user : userInfo } = useAppSelector(s => s.user)

    if (typeof channel !== 'string') {
        return null
    }
    if (typeof userInfo === null) {
        return null
    }
    const id = userInfo?.id || 'abc' as string

    const selfId = channel.substring(0,id.length)
    const userId = channel.substring(selfId.length)
        
    if (selfId !== userInfo?.id) {
        return null
    }
    const userData = useGetUserData(userId)

    if (!userData) {
        return null
    }
    

   return (
        <div className="py-1 px-4 flex flex-row items-center gap-2 border-b border-slate-300 shadow-sm drop-shadow-sm bg-white">
            <div className='sm:hidden  p-2 aspect-square text-3xl hover:bg-gray-100 rounded-full'
                onClick={hideChat}
            >
                <BiArrowBack className="opacity-70" />
            </div>
            <div className="w-[45px] aspect-square rounded-full bg-green-500 flex items-center justify-center text-white">
                {userData?.userName[0]?.toUpperCase() || 'L'}
            </div>
            <div className='me-auto'>
                <p className='font-semibold'>
                    {userData?.name || 'loading...'}
                </p>
                <p className='text-sm font-light opacity-80'>
                    {`@${userData?.userName}` || 'loading...'}
                </p>
            </div>
            <div className='flex flex-row items-center gap-2 text-2xl'>
                <span className='aspect-square p-2 hover:bg-[#e6e6e6] rounded-full flex items-center justify-center'>
                    <BiSearch />
                </span>            
            </div>
        </div>
    )
}