import { db } from "@/db/firebase"
import { userData } from "@/types"
import { doc, getDoc, DocumentSnapshot, DocumentData } from 'firebase/firestore'

class ProfileURLS {
    private urls : Record<string, string>
    private urlPromises : Record<string,Promise<DocumentSnapshot<DocumentData>>>

    constructor () {
        this.urls = {}
        this.urlPromises = {}
    }

    public async getUrl(id:string) : Promise<string> {
        if (this.urls.hasOwnProperty(id)) {
            const localURL = this.urls[id]
            console.log('url cached')
            return localURL
        }
        if (this.urlPromises.hasOwnProperty(id)) {
            console.log('awaiting profile url')
            const promiseURL = this.urlPromises[id]
            const document = await promiseURL
            if (!document.exists()) {
                this.urls[id] = ''
                return ''
            }
            const data = document.data() as userData
            const { profile } = data
            this.urls[id] = profile === undefined ? '' : profile
            return typeof profile === 'string' ? profile : ''
        }
        console.log('refetching profile url')
        const userRef = doc(db, 'users', id)   
        this.urlPromises[id] = getDoc(userRef)
        return this.getUrl(id)
    }
}

export const ProfileURL = new ProfileURLS()