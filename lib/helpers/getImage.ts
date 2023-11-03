import { storage } from "@/db/firebase";
import { ref, getDownloadURL } from 'firebase/storage'

class FirebaseImages {
    private images : Record<string, string>
    private imagePromises : Record<string,Promise<string>>
    constructor() {
        this.images = {}
        this.imagePromises = {}
    }
    public async getImage(url:string) : Promise<string> {
        if (this.images.hasOwnProperty(url)) {
            const localImage = this.images[url]
            console.log('image cached')
            return localImage
        }
        if (this.imagePromises.hasOwnProperty(url)) { 
            console.log('awaiting image')
            const promiseImage = this.imagePromises[url]
            const imageURL = await promiseImage
            this.images[url] = imageURL
            return imageURL
        }

        const profileRef = ref(storage, url)
        console.log('refetching image')            
        this.imagePromises[url] = getDownloadURL(profileRef)
        return this.getImage(url)
    }
}

export const Images =  new FirebaseImages()
