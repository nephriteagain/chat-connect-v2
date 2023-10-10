import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/db/firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";


export const createNewChannel = createAsyncThunk(
    'user/newChannel', 
    async ({
        makerId,
        name,
        desc = ''
    }: {
        makerId: string; 
        name: string; 
        desc?: string;}) => {
        const colRef = collection(db, 'channels')
        const data = await addDoc(colRef, {
            makerId,
            name,
            desc,
            createAt: Date.now()
        })
        const docRef = doc(db, 'channels', data.id)
        const document = await getDoc(docRef)
        return {
            id: document.id,
            ...document.data()
        }
    }
)