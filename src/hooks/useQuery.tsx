import React, {useState} from 'react'

interface useQueryTypes {
    fetchFunc(...args: any): Promise<any>
}

const useQuery = <t,>({ fetchFunc }: useQueryTypes) => {
    const [loading, setLoading] = useState(false)

    const call = (...args: any) => new Promise<t>((resolve, reject) => {
        setLoading(true)

        fetchFunc(...args)
        .then(json => {
            setLoading(false)
            resolve(json)
        }).catch(e => {
            setLoading(false)
            reject(e)
        })
    })

    return {
        call,
        loading,
    }
}

export default useQuery