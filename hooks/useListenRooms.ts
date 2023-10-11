import { useEffect } from "react";
import { db } from "@/db/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getRooms } from "@/redux/roomsSlice";
import { roomBanner } from "@/types";

export function useListenRooms() {

    const dispatch = useAppDispatch()
    const { rooms } = useAppSelector(s => s.rooms)

    useEffect(() => {
        const colRef = collection(db, 'roomBanners')
        const unsub = onSnapshot(colRef, snapshot => {
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
    }, [])

    return rooms
}