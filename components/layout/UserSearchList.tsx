import { useAppSelector } from "@/redux/hooks"
import { userData } from "@/types";

import { useAppDispatch } from "@/redux/hooks";
import { ReactDispatch } from "@/types";

export default function UserSearchList({setMembers, setOtherUser}: {
    setMembers: ReactDispatch<{id:string;role:'admin'|'mod'|'member'}[]>
    setOtherUser: ReactDispatch<null|{id:string; name: string}>
}) {
    const { userSearches } = useAppSelector(s => s.rooms)
    const dispatch = useAppDispatch()

    function handleClick(id:string, isChecked: boolean, name:string) {
        if (isChecked) {
            setMembers(m => [...m, {id, role: 'member'}])
            setOtherUser({id, name})
            return
        }
        setMembers(m => m.filter(u => u.id !== id))
        setOtherUser(null)
    }

    return (
        <div className="flex flex-col gap-1 w-full">            
            <p className="text-sm opacity-60 italic pt-2" key={'users'}>users</p>
            <div className="flex flex-row gap-1 w-full">
                <UserList 
                    users={userSearches} 
                    handleClick={handleClick}
                />
            </div>
        </div>
    )
}

function UserList({users, handleClick}: {users: userData[]; handleClick: (id:string,isChecked: boolean, name:string) => void}) {
    
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
                            handleClick={handleClick}
                        />     
                )
            })
        }
        </>
    )
}


function UserSearchItems({name, userName, id, handleClick}: {
    name:string; userName:string; id:string; handleClick: (id:string, isChecked: boolean, name:string) => void}) {
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
                    onClick={(e) => {
                        const checked = e.currentTarget.checked
                        handleClick(id, checked, name)
                    }}
                />        
            </div>
        </div>
    )
}