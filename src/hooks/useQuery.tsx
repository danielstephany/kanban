import React, {useState} from 'react'

interface useQueryTypes {
    fetchFunc(...args: any): Promise<any>,
    loading?: boolean
}

const useQuery = <t,>({ fetchFunc, loading: initialLoading }: useQueryTypes) => {
    const [loading, setLoading] = useState(initialLoading || false)
    const [result, setResult] = useState(null)

    const call = (...args: any) => new Promise<t>((resolve, reject) => {
        setLoading(true)

        fetchFunc(...args)
        .then(json => {
            setLoading(false)
            setResult(json)
            resolve(json)
        }).catch(e => {
            setLoading(false)
            reject(e)
        })
    })

    return {
        call,
        loading,
        result,
        setLoading,
    }
}

export default useQuery