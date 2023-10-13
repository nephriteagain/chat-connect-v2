import { useEffect, useState } from 'react'
import { db } from '@/db/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addNames } from '@/redux/namesSlice'

export function useGetSenderName(id: string|undefined, dependencies?: any[], ) {
    const [ name, setName ] = useState('')
    const { names } = useAppSelector(s => s.names)
    const dispatch = useAppDispatch()

    async function getName() {
        if (id == undefined) return
        const localName = names[id]
        if (localName) {
            setName(localName)
            return
        }
        const docRef = doc(db, 'users', id)
        const document = await getDoc(docRef)
        if (!document.exists()) return
        const data = document.data()
        const { name } = data
        dispatch(addNames({key:id, value: name}))
        setName(name)
    }

    useEffect(() => {
        getName()
    }, dependencies||[])

    return name
}