import { db } from "@/db/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/userSlice";
import type { userData } from "@/types";

export function useListenUser(userId: string|undefined) {
    const { user } = useAppSelector(s => s.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (userId === undefined) return
        const docRef = doc(db, 'users', userId)
        const unsub = onSnapshot(docRef, snapshot => {
            if (snapshot.exists()) {
                const document = snapshot.data() as Omit<userData,'id'>
                dispatch(getUser({...document, id: snapshot.id}))                
            }
        })

        return () => unsub()

    }, [userId])

    return user
}