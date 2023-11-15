"use client"

import { useEffect, useState, } from 'react'
import { usePathname, } from 'next/navigation'

export function useMouseLoading() {
    const pathName = usePathname()

    const [ isMouseLoading, setIsMouseLoading ] = useState(false)
    const [ currentPathName, setCurrentPathName ] = useState(pathName)
    
    useEffect(() => {
        if (pathName !== currentPathName) {
            setIsMouseLoading(false)            
            setCurrentPathName(pathName)
        }

    }, [pathName])

    useEffect(() => {
        const body = document.body;
        if (isMouseLoading) {
            body.style.cursor = 'wait'   
            return;
        }
        body.style.cursor = 'auto';
        return
    }, [isMouseLoading])

    return function () {
        setIsMouseLoading(true)
    }
}