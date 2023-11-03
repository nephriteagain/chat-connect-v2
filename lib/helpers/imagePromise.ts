import { db } from "@/db/firebase"
import { userData } from "@/types"
import { doc, getDoc } from 'firebase/firestore'
import { DocumentSnapshot, DocumentData } from "firebase/firestore"

/**
 * @description prevent multiple fetching of the same data
 */
class ProfileURL {
    private profilesPromises : Map<string,Promise<DocumentSnapshot<DocumentData>>>
    private profiles : Record<string,string>

    constructor() {
        this.profiles = {}
        this.profilesPromises = new Map()

    }

    public async getURL(id:string) : Promise<string> {

        if (this.profiles.hasOwnProperty(id)) {
            console.log('cached image from class' + id)
            return this.profiles[id]
        }
        if (this.profilesPromises.has(id)) {
            console.log('awaiting image' + id)
            const document = await this.profilesPromises.get(id)
            if (!document?.exists()) {
                this.profiles[id] = ''
                return ''
            }
            const { profile } = document.data() as userData
            if (!profile) {
                this.profiles[id] = ''
                return ''
            }
            this.profiles[id] = ''
            return profile

        }
        console.log('fetching image' + id)
        const docRef = doc(db, 'users', id)
        this.profilesPromises.set(id,getDoc(docRef))
        return this.getURL(id)
    }
}

export const ProfileURLS = new ProfileURL()