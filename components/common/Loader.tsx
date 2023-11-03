import { ReactNode } from "react";
import { BiLoaderAlt } from 'react-icons/bi'

export default function Loader({className='', children, isLoading}: {className?:string; children: ReactNode; isLoading:boolean}) {
    if (isLoading) return (        
        <>
            <BiLoaderAlt className={`animate-spin ${className}`} />
        </>
    
    )
    return (
        <>
        {children}
        </>
    )
    
}