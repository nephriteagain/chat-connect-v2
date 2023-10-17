import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"

export default function SearchList() {
    const { searches } = useAppSelector(s => s.rooms)

    return (
        <div className="flex flex-col gap-1">
            {searches?.map(s => {                
                const { id, name, members } = s
                return <SearchItem 
                    key={id} 
                    name={name} 
                    members={members.length} 
                    id={id}
                />                                    
            })}        
        </div>

    )
}

function SearchItem({name, members, id}: {name: string; members: number; id: string}) {
    const router = useRouter()
    return (
        <div className="w-full p-2 flex flex-row gap-4 hover:bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => router.push(`/c/${id}`)}
        >            
            <div className="w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {name[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">{members} {members > 1 ? 'members' : 'member'}</p>
            </div>
        </div>
    )
}