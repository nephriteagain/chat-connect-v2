import { useEffect } from "react";
import { db } from "@/db/firebase";
import { useParams, useRouter } from "next/navigation";
import { onSnapshot, doc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getChannel } from "@/redux/channelSlice";
import type { room } from "@/types";

export function useListenRoom() {
    const { channel } = useParams()
    const router = useRouter()
    const { channel : room } = useAppSelector(s => s.channel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (typeof channel !== 'string')  return;
        const docRef = doc(db, 'rooms', channel) 
        const unsub = onSnapshot(docRef,  (snapshot) => {
            if (!snapshot.exists()) {
                dispatch(getChannel(null))
                router.replace('/')
            };
            const doc = snapshot.data()            
            const data = {...doc, id: channel} as room
            dispatch(getChannel(data))
        })
        return () => unsub()
    }, [channel])
    return room
}