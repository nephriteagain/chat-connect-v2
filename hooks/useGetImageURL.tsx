import { useState, useEffect } from "react";
import { Images } from "@/lib/helpers/getImage";

export function useGetImageURL(profile:string|undefined) {
    const [imageURL, setImageURL] = useState('')

    async function getURL(profile:string|undefined) {
        if (profile) {
            const URL = await Images.getImage(profile)
            if (typeof URL === 'string') {
                setImageURL(URL)            
            }
        }
    }

    useEffect(() => {
        console.log('refetching image')
        if (profile) {
            getURL(profile)
        }
    }, [profile])

    return imageURL
}