import React, {useRef, useEffect} from 'react'
import { TextField } from '@mui/material'
import type {
    TextFieldProps
} from "@mui/material"

type DebouncedTextFieldProps = TextFieldProps & {
    debounceTime?: number,
    searchFn: (name: string, value: string) => void,
    setValueFn: React.Dispatch<React.SetStateAction<string>>,
    value: string
}

export default function DebouncedTextField({ 
    name="", 
    debounceTime=400, 
    searchFn,
    setValueFn,
    value,
    ...others
}: DebouncedTextFieldProps){
    const debounceTimeTracking = useRef<null | number>(null);
    const debounceFn = useRef<ReturnType<typeof setTimeout> | null>();

    const handleCallSearch = (searchValue: string) => {
        debounceFn.current = setTimeout(() => {
            searchFn(name, searchValue)            
        }, debounceTime)
    }

    const handleChange = (e: {target: {value: string}}) => {
        if(!debounceTimeTracking.current) debounceTimeTracking.current = Date.now();
        const timeStamp = Date.now();
        const shouldResetDebounce = timeStamp - debounceTimeTracking.current < debounceTime

        setValueFn(e.target?.value)
        
        if (shouldResetDebounce && debounceFn.current){           
            clearTimeout(debounceFn.current)
            debounceFn.current = null
        }
        
        handleCallSearch(e.target?.value)
        debounceTimeTracking.current = timeStamp
    }   

    const handleResetTimeout = () => {
        if (debounceFn.current){
            clearTimeout(debounceFn.current) 
            debounceFn.current = null
        } 
    }

    useEffect(() => handleResetTimeout(), [])

    return (
        <TextField
            name={name}
            value={value}
            onChange={handleChange}
            {...others}
        />
    )
}