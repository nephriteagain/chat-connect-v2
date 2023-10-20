import { useAppSelector } from "@/redux/hooks"
import { userData } from "@/types";

import { useAppDispatch } from "@/redux/hooks";

export default function UserSearchList() {
    const { userSearches } = useAppSelector(s => s.rooms)
    const dipatch = useAppDispatch()

    return (
        <div className="flex flex-col gap-1 w-full">            
            <p className="text-sm opacity-60 italic pt-2" key={'users'}>users</p>
            <div className="flex flex-row gap-1 w-full">
                <UserList users={userSearches} />
            </div>
        </div>
    )
}

function UserList({users}: {users: userData[]}) {
    
    return (
        <>
        {
            users.map(u => {
                const {name, userName, id } = u
                return (
                        <UserSearchItems
                            key={id}
                            name={name}
                            userName={userName}
                            id={id}
                        />
                )
            })
        }
        </>
    )
}


function UserSearchItems({name, userName, id}: {name:string; userName:string; id:string}) {
    return (
        <div className="w-full flex-grow p-2 flex flex-row gap-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >            
            <div className="w-12 aspect-square bg-blue-400 rounded-full shadow-md flex items-center justify-center font-bold">                
                {userName[0].toLocaleUpperCase()}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{name}</p>
                <p className="opacity-60 text-sm">@{userName}</p>
            </div>
            <div className="ms-auto flex items-center justify-center p-2">
                <input type="checkbox" value={id} 
                    className="scale-[2] aspect-square"
                />        
            </div>
        </div>
    )
}