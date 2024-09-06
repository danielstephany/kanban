import React, {useState} from 'react'

type htmlFormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

interface iUseFormCtrl {
    initialValues: {[name: string]: string | number}
    validate: () => {[key: string]: boolean}
}

const useFormCtrl = ({ initialValues, }: iUseFormCtrl) => {
    const [values, setValues] = useState(initialValues || {})

    const handleChange = (e: { target: htmlFormElements }) => {
        const name = e.target.name
        const value = e.target.value
        setValues({...initialValues, [name]: value})
    }

    return {
        values,
        handleChange,
    }
}