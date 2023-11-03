import { storage } from "@/db/firebase";
import { ref, getDownloadURL } from 'firebase/storage'

class FirebaseImages {
    private images : Record<string, string>
    constructor() {
        this.images = {}
    }
    public async getImage(url:string) {
        const localImage = this.images[url]
        if (localImage) {
            console.log('image cached')
            return localImage
        }

        const profileRef = ref(storage, url)
        try {
            console.log('refetching image')
            const imageURL = await getDownloadURL(profileRef)
            this.images[url] = imageURL
            return imageURL
        } catch (error) {
            console.error(error)
        }
    }
}

export const Images =  new FirebaseImages()
