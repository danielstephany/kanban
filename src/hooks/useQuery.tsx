import React, {useState} from 'react'

interface useQueryTypes {
    fetchFunc(...args: any): Promise<any>,
    loading?: boolean
}

const useQuery = <t,>({ fetchFunc, loading: initialLoading }: useQueryTypes) => {
    const [loading, setLoading] = useState(initialLoading || false)

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