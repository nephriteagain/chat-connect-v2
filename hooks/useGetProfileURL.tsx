import { useEffect, useState } from 'react'
import { db } from '@/db/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addProfiles } from '@/redux/namesSlice'
import { userData } from '@/types'

export function useGetProfileURL(id:string|undefined) {
    const [ profile, setProfile ] = useState('')

    const { profiles } = useAppSelector(s => s.names)
    const dispatch = useAppDispatch()

    async function getProfile() {
        if (!id) return;
        const localProfile = profiles[id]
        if (localProfile || localProfile === '') {
            console.log('image cached locally')
            setProfile(localProfile)
            return
        }
        const docRef = doc(db, 'users', id)
        try {
            console.log('refetching image')
            const document = await getDoc(docRef)
            if (!document.exists()) return;
            const data = document.data() as userData
            const { profile : prof } = data
            if (prof) {
                dispatch(addProfiles({key:id, value: prof}))
                setProfile(prof)
            }
        } catch (error) {
            console.error('error')
        }
        
    }

    useEffect(() => {
        getProfile()
    }, [])

    return profile
}