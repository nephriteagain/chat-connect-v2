import { BiArrowBack } from "react-icons/bi";
import { BsCheck2 } from 'react-icons/bs'
import { LuImagePlus } from 'react-icons/lu'

import { useState, FormEvent, useEffect, ChangeEvent } from 'react'

import { motion, AnimatePresence } from "framer-motion";
import type { ReactDispatch } from "@/types";

import { updateUserData } from "@/redux/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { auth } from "@/db/firebase";
import { useGetImageURL } from "@/hooks/useGetImageURL";

import Loader from "../common/Loader";

// TODO: finish tommorow
export default function UserEdit({firstName, lastName, userName, bio, setShowUserEdit}: {
    firstName: string;
    lastName: string;
    userName: string;
    bio?: undefined|string;
    setShowUserEdit: ReactDispatch<boolean>
}) {

    const [ fName, setFName] = useState(firstName)
    const [ lName, setLName ] = useState(lastName)
    const [ uName, setUName ] = useState(userName)
    const [ biography, setBiography ] = useState(bio? bio : '')

    const [ nameFocus, setNameFocus ] = useState(false)
    const [ lastFocus, setLastFocus ] = useState(false)
    const [ userFocus, setUserFocus ] = useState(false)
    const [ bioFocus, setBioFocus ] = useState(false)
    const [ profile, setProfile ] = useState<null|{type: string,data:string}>(null)
    const [ fileData, setFileData ] =useState('')

    const [ userNameAvailable, setUserNameAvailable ] = useState(true)

    const [ validForm, setValidForm ] = useState(true)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ userNameLoading, setUserNameLoading ] = useState(false)

    const { user } = useAppSelector(s => s.user)
    
    const imageURL = useGetImageURL(user?.profile)
    const dispatch = useAppDispatch()

    async function handleUpdateUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!user) {
            console.error('userData missing')
            return
        }
        if (!auth.currentUser) {
            console.error('unauthorized')
            return
        }
        if (!validForm) {
            console.error('form invalid!')
            return
        }
        const firstName = fName
            .split(' ')
            .filter(word => word.length > 1)
            .join(' ')
        const lastName = lName
            .split(' ')
            .filter(word  => word.length > 1)
            .join(' ')
        const name = `${firstName} ${lastName}`   
        try {
            setIsLoading(true)
            await dispatch(updateUserData({
                name,
                bio: biography,
                userName: uName,
                userId: user.id,
                authId: auth.currentUser?.uid,
                profile
            }))
            setShowUserEdit(false)
        } catch (error) {
            console.error('error')   
        } finally {
            setIsLoading(false)
        }

    }

    function checkIfValid() : boolean {
        // checks alphabets, number and underscore
        
        if (!userNameAvailable)  {
            return false            
        }
        if (fName.length === 0 || fName.length > 70) return false
        if (lName.length === 0 || lName.length > 70) return false
        if (uName.length < 5 || uName.length > 70) return false
        if (biography.length > 500) return false
        
        const regex = /^[A-Za-z0-9_]*$/
        const regexWithWhiteSpace = /^[A-Za-z0-9_\s]*$/
        const fTest = regexWithWhiteSpace.test(fName)
        const lTest = regexWithWhiteSpace.test(lName)
        const uTest = regex.test(uName)
        if (!fTest || !lTest || !uTest) {
            return false
        }

        return true
    }


    async function checkUserNameIfAvailable(check:string)  {
        if (check.length < 5) return 
        if (userNameLoading) return
        try {
            setUserNameLoading(true)
            const response = await fetch(`/api/user/checkUserName?check=${check}`)
            const data = await response.json() as Awaited<{check:boolean}>
            return setUserNameAvailable(data.check)
        } catch (error) {
            console.error(error)
            console.error('something went wrong during the fetching')            
        } finally {
            setUserNameLoading(false)
        }
        return setUserNameAvailable(false)
    }

    function changeProfile(e: ChangeEvent<HTMLInputElement>) {
        const val : FileList|null = e.currentTarget.files
        if (val) {
            const file = val[0]
            if (file && file.size > 5_000_000) {
                console.error('file too large!')
            }
            if (file) {
                console.log(file.type)
                const reader =  new FileReader()
                reader.onload = event => {
                    const fileAsDataURL = event.target?.result
                    if (file.size > 5_000_000) {
                        console.error('file too large')
                        return
                    }
                    if (typeof fileAsDataURL === 'string') {
                        setProfile({type: file.type, data: fileAsDataURL})
                        setFileData(fileAsDataURL)
                    }
                }
                reader.readAsDataURL(file)
            }
        }
    
    }


    useEffect(() => {
        const isValid = checkIfValid()
        setValidForm(isValid)
    }, [fName, lName, uName, userNameAvailable])

    useEffect(() => {
        setUserNameAvailable(userName === uName)
    }, [uName])
    

    return (
        <motion.div 
            initial={{x:'100%'}}
            animate={{x:'0%'}}
            exit={{x:'100%'}}
            transition={{duration: 0.2}}
            className="z-[9999] p-4 absolute top-0 left-0 w-full h-full bg-white flex flex-col gap-6 items-center"
        >
            <div className="flex flex-row gap-8 items-center w-full pb-2">
                <div 
                    onClick={() => setShowUserEdit(false)} 
                    className="text-2xl text-gray-500 p-2 rounded-full hover:bg-gray-200"
                >
                    <BiArrowBack />
                </div>
                <p className="flex-grow text-left text-lg font-semibold">
                    Edit Profile
                </p>
            </div>
            <div className="relative text-2xl font-bold w-32 bg-gray-500 rounded-full aspect-square flex items-center justify-center text-white shadow-md drop-shadow-md group">
                <div className="absolute z-10 text-5xl  group-hover:scale-150 transition-all duration-150">
                    <LuImagePlus  className="drop-shadow-md " />
                </div>
                <input 
                    type="file" 
                    name="profile" 
                    id="profile"
                    className="absolute w-full h-full z-20 opacity-0" 
                    accept="image/png,image/jpeg"
                    // value={profile}
                    onChange={changeProfile}
                />
                { Boolean(!user?.profile) ? `${firstName[0]}${lastName[0]}` :
                    <img 
                        src={fileData ? fileData :imageURL}
                        alt=''
                        className="absolute w-full h-full rounded-full"                        
                    />
                }
            
            </div>
            <form className="py-4 flex flex-col gap-4"
                onSubmit={handleUpdateUser}
            >
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!nameFocus && fName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        First Name
                    </motion.p>
                    <input 
                        type="text" 
                        required 
                        value={fName}
                        minLength={1}
                        maxLength={70}
                        onChange={(e) => setFName(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                </div>
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!lastFocus && lName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Last Name
                    </motion.p>
                    <input 
                        type="text" 
                        required 
                        value={lName}
                        minLength={1}
                        maxLength={70}
                        onChange={(e) => setLName(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                    />
                </div>
                <div className="w-full relative">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!bioFocus && biography.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Bio (optional)
                    </motion.p>
                    <input 
                        type="text" 
                        maxLength={500}
                        value={biography}
                        onChange={(e) => setBiography(e.currentTarget.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setBioFocus(true)}
                        onBlur={() => setBioFocus(false)}
                    />
                </div>
                <p className="font-semibold text-blue-400">
                    Username
                </p>
                <div className="w-full relative flex flex-row gap-2 items-center">
                    <motion.p  
                        layout
                        transition={{duration:0.15}}
                        className={`absolute bg-white z-20 py-[2px] px-1 pointer-events-none   ${!userFocus && uName.length === 0 ? 'text-lg left-2 top-2 opacity-60' : 'text-sm left-2 -top-2 text-blue-400'}`}>
                        Username
                    </motion.p>
                    <motion.input 
                        layout
                        type="text" 
                        required 
                        maxLength={70} 
                        minLength={5}
                        value={uName}
                        onChange={(e) => {
                            const regex = /^[A-Za-z0-9_]*$/
                            if (regex.test(e.currentTarget.value)) {
                                setUName(e.currentTarget.value)
                            }
                           
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-400"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <motion.div layout className="w-fit flex items-center justify-center">
                        <AnimatePresence>
                        {
                            userNameAvailable ?
                            <motion.div 
                                className="p-3 aspect-square bg-green-400 rounded-full shadow-md drop-shadow-md"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.2, ease: 'easeInOut'}}
                            >
                                <BsCheck2 className="fill-white text-xl" />
                            </motion.div> :
                            <motion.div                             
                                className="py-[10px] px-2 border-2 border-blue-400 rounded-xl text-blue-600 hover:bg-blue-400 hover:text-blue-800 transition-all duration-150 shadow-md drop-shadow-md cursor-pointer"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.2, ease: 'easeInOut'}}

                                onClick={async () => checkUserNameIfAvailable(uName)}
                                >
                                <Loader isLoading={userNameLoading} className="text-xl fill-blue-600">
                                    check
                                </Loader>
                            </motion.div>
                        }
                        </AnimatePresence>
                    </motion.div>
                </div>
                <div className="w-5/6">
                    <p className="text-sm opacity-60 font-semibold">
                        for the Username, you can use a-z, 0-9 and underscores. Minimum length of 5 characters
                    </p>
                </div>
                
                <button type="submit"
                    className="absolute bottom-4 right-4 text-2xl p-4 rounded-full aspect-square bg-blue-400 hover:bg-blue-500 shadow-sm drop-shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!validForm || isLoading}
                >
                    <Loader isLoading={isLoading} className="fill-white">
                    <BsCheck2 className="fill-white" />
                    </Loader>
                </button>
            </form>
        </motion.div>
    )
}