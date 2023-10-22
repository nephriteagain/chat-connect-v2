import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect } from 'react'
import { useParams } from "next/navigation";
import { db } from "@/db/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getMessages } from "@/redux/userChannelSlice";
import { message } from "@/types";

export function useListenUserMessages() {
    const { user } = useParams()

    const { messages } = useAppSelector(s => s.userChannel)
    const { user : userData } = useAppSelector(s => s.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (typeof user !== 'string' || !userData?.id) return
        // your id, then other id
        const colRef = collection(db, `${user}${userData.id}`)
        const unsub = onSnapshot(colRef, snapshot => {
            if (snapshot.empty) {
                dispatch(getMessages([]))
                return
            }
            const msgList : message[] = [];
            snapshot.forEach(doc => {
                const data = doc.data() as message
                msgList.push(data)
            })
            dispatch(getMessages(msgList.sort((a,b) => a.date - b.date)))
        })

        return () => unsub()
    }, [user])


    return messages
}