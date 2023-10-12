import { useEffect } from "react";
import { db } from "@/db/firebase";
import { useParams } from "next/navigation";
import { onSnapshot, doc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getChannel } from "@/redux/channelSlice";
import type { room } from "@/types";

export function useListenRoom() {
    const {channel} = useParams()
    const { channel : room } = useAppSelector(s => s.channel)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (typeof channel !== 'string')  return;
        const docRef = doc(db, 'rooms', channel) 
        const unsub = onSnapshot(docRef,  (snapshot) => {
            if (!snapshot.exists()) return;
            const doc = snapshot.data()
            const data = {...doc, id: doc.id} as room
            console.log(data)
            dispatch(getChannel(data))
        })
        return () => unsub()
    }, [channel])
    return room
}