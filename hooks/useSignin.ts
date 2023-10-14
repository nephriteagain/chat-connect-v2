import { useEffect,  } from 'react';
import { auth, provider, db } from "@/db/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { useAppDispatch } from '@/redux/hooks';
import { getUser } from '@/redux/userSlice';
import { User } from 'firebase/auth';

export  function useSignin() {
    const dispatch = useAppDispatch()

    async function signIn() {
        try {
            const data = await signInWithPopup(auth, provider)
            const { uid, displayName, email, } = data.user
            const docRef = doc(db, 'users', uid)
            const userData = await getDoc(docRef)
            if (!userData.exists()) {
                await setDoc(docRef, {
                    name: displayName,
                    email,
                    userName: email?.slice(0,email.indexOf('@')),
                    createdAt: Date.now(),
                    channels: []
                })
                const userData = await getDoc(docRef)
                const payload = {...userData.data(), id: userData.id}
                dispatch(getUser(payload))
                return
            }
            const payload = {...userData.data(), id: userData.id}
            dispatch(getUser(payload))
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