import { useEffect } from "react";
import { db } from "@/db/firebase";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { getMessages } from "@/redux/channelSlice";
import type { message } from "@/types";

export function useListenMessages() {
    const { channel } = useParams()
    const { messages } = useAppSelector(s => s.channel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (typeof channel !== 'string') return
        const colRef = collection(db, channel)
        const unsub = onSnapshot(colRef, snapshot => {
            if (snapshot.empty) {
                dispatch(getMessages([]))
                return
            }
            const msgList : message[] = []
            snapshot.forEach(doc => {
                const data = doc.data() as message
                msgList.push(data)
            })
            dispatch(getMessages(msgList))            
        })
        return () => unsub()
    }, [channel])

    return messages
}