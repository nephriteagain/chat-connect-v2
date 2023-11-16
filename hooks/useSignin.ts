import { useEffect,  } from 'react';
import { auth, provider, db } from "@/db/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, runTransaction, arrayUnion } from 'firebase/firestore'
import { useAppDispatch } from '@/redux/hooks';
import { getUser } from '@/redux/userSlice';
import { User } from 'firebase/auth';
import { generateRandomId } from '@/lib/helpers/randomIdGen';

export  function useSignin() {
    const dispatch = useAppDispatch()

    async function signIn() {
        try {
            const data = await signInWithPopup(auth, provider)
            const { uid, displayName, email, } = data.user            
            const docRef = doc(db, 'users', uid)

            await runTransaction(db, async transaction => {
                const document = await transaction.get(docRef)
                if (!document.exists()) {
                    const publicRoomId = 'KSaiVLa8jjcGoMf';
                    const publicRoomRef =  doc(db, 'rooms', publicRoomId)

                    const userData = {
                        name: displayName,
                        email,
                        userName: (email?.slice(0,email.indexOf('@')) + '_' + generateRandomId(10)).toLowerCase(),
                        createdAt: Date.now(),
                        channels: [publicRoomId]
                    }
                    transaction.set(docRef, userData)
                    transaction.update(publicRoomRef, {
                        members: arrayUnion({
                            id: uid, 
                            role: 'member'
                        })
                    })
                    const payload = {...userData, id: uid}
                    dispatch(getUser(payload))
                    return
                }
                const payload = {...document.data(), id: document.id}
                dispatch(getUser(payload))
                return
            })
        } catch (error) {
            console.error(error)
        }
    }

    async function authState(user: User|null) {
        if (user === null) {
            dispatch(getUser(user))
            return
        }
        const uid = user.uid
        const docRef = doc(db, 'users', uid)
        const document = await getDoc(docRef)
        if (document.exists()) {
            const payload = {...document.data(), id: document.id}
            dispatch(getUser(payload))
        }
        return
    }
   

    useEffect(() => {
        const unsub =  onAuthStateChanged(auth, async user => {            
            await authState(user)
        })
        return () => unsub()
    }, [])

    return signIn
}