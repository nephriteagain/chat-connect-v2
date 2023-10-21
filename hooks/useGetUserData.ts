import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/thunks';

export function useGetUserData(userId:string) {
    const dispatch = useAppDispatch()
    const { userData } = useAppSelector(s => s.userChannel)

    async function handleFetch() {
        try {
            await dispatch(getUser(userId))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [userId])

    return userData
}