import React, {useState} from 'react'
import type { Dispatch, SetStateAction } from 'react'

type htmlFormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type tValidationObj = { [key: string]: boolean | string | undefined }
export type tFormCtrlValues = {[key: string]: any}

interface iUseFormCtrl<v> {
    initialValues: v
    noValidate?: boolean,
    validate?: (values: tFormCtrlValues, storedValues: tFormCtrlValues) => tValidationObj
}

export interface iUseFormCtrlRes {
    values: tFormCtrlValues,
    errors: tValidationObj,
    setValues: (value: any)=> void,
    setErrors: (value: any)=> void,
    handleChange: (e: { target: htmlFormElements }) => void,
    handleBlure: (e: { target: htmlFormElements }) => void,
    validate: (values: tFormCtrlValues, storedValues:tFormCtrlValues) => void,
    isValidatedForm: () => boolean
}

const defaultValidate = (values: tFormCtrlValues, _: tFormCtrlValues) => {
    const errors: tValidationObj = {}

    Object.entries(values).forEach(([key, value]) => {
        if (!value) errors[key] = true
    })

    return errors
}

function useFormCtrl<v = {},>({ initialValues, validate=defaultValidate, noValidate=false }: iUseFormCtrl<v>) {
    const [values, setValues] = useState<iUseFormCtrl<v>['initialValues']>(initialValues)
    const [errors, setErrors] = useState<tValidationObj>({})

    const handleChange = (e: { target: htmlFormElements }) => {
        const name = e.target.name
        const value = e.target.value
        setValues({ ...values, [name]: value})
    }

    const handleBlure = (e: { target: htmlFormElements }) => {
        if (!noValidate) {
            const value = e.target.value
            const name = e.target.name
            const updatedValue = { [name]: value}
            const validationErrors = validate(updatedValue, values as tFormCtrlValues)
    
            if (validationErrors[name]){
                setErrors({ ...errors, ...validationErrors })
            } else {
                const updatedErrors = {...errors}
                delete updatedErrors[name]
                setErrors(updatedErrors)
            }
        }
    }

    const isValidatedForm = () => {
        if (noValidate) return true
        
        const isValid = true
        const validationErrors = validate(values as tFormCtrlValues, values as tFormCtrlValues)
        if(Object.keys(validationErrors).length) {
            setErrors(validationErrors)
            const errorEl: HTMLInputElement | HTMLAreaElement | null = document.querySelector(".Mui-error input, .Mui-error textarea")
            if (errorEl) errorEl.focus();
            return false
        } else {
            setErrors({})
        }

        return isValid
    }

    return {
        values,
        errors,
        setValues,
        setErrors,
        handleChange,
        handleBlure,
        validate,
        isValidatedForm
    }
}

export default useFormCtrl