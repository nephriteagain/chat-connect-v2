import { useEffect, useState } from 'react'
import { db } from '@/db/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addProfiles } from '@/redux/namesSlice'

import { ProfileURLS } from '@/lib/helpers/imagePromise'

export function useGetProfileURL(id:string|undefined) {
    const [ profile, setProfile ] = useState('')

    const { profiles } = useAppSelector(s => s.names)
    const dispatch = useAppDispatch()

    async function getProfile() {
        if (!id) return
        if (profiles.hasOwnProperty(id)) {
            console.log('cached image from state' + id)
            setProfile(profiles[id])
            return
        }
        try {
            const profileURL = await ProfileURLS.getURL(id)
            setProfile(profileURL)
            dispatch(addProfiles({key: id, value: profile}))
            return
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        getProfile()
    }, [])

    return profile
}