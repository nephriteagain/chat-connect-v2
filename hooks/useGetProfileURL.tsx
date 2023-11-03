import { useEffect, useState } from 'react'
import { ProfileURL } from '@/lib/helpers/getImageURL'

export function useGetProfileURL(id:string|undefined) {
    const [ profile, setProfile ] = useState('')


    async function getProfile() {
        if (!id) return
        try {
            const profURL = await ProfileURL.getUrl(id)
            setProfile(profURL)
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        getProfile()
    }, [])

    return profile
}