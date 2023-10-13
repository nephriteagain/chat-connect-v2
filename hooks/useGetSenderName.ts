import { useEffect, useState } from 'react'
import { db } from '@/db/firebase'
import { getDoc, doc } from 'firebase/firestore'

export function useGetSenderName(id: string|undefined, dependencies?: any[], ) {
    const [ name, setName ] = useState('')

    async function getName() {
        if (id == undefined) return
        const docRef = doc(db, 'users', id)
        const document = await getDoc(docRef)
        if (!document.exists()) return
        const data = document.data()
        const { name } = data
        setName(name)
    }

    useEffect(() => {
        getName()
    }, dependencies||[])

    return name
}