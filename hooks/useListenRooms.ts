import { useEffect } from "react";
import { db } from "@/db/firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getRooms } from "@/redux/roomsSlice";
import { roomBanner } from "@/types";

export function useListenRooms() {


    const dispatch = useAppDispatch()
    const { rooms } = useAppSelector(s => s.rooms)
    const { user } = useAppSelector(s => s.user)

    useEffect(() => {
        if (user === null || user?.channels === undefined) return
        const channels = user.channels
        if (channels.length === 0) return
        const colRef = collection(db, 'roomBanners')
        const q = query(colRef, where('id', 'in', channels))
        const unsub = onSnapshot(q, snapshot => {
            if (snapshot.empty) {
                dispatch(getRooms([]))
                return
            }
            const roomList : roomBanner[] = []
            snapshot.forEach(doc => {
                const room = doc.data() as roomBanner           
                roomList.push(room)
            })
            console.log(roomList)
            dispatch(getRooms(roomList))
        })
        return () => unsub()
    }, [user?.channels])

    return rooms
}