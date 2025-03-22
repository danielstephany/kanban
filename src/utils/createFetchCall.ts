import type {
    ApiRequestParams
} from '@src/endpoints/types.ts'

const buildQueryString = (queryObj?: ApiRequestParams) => {
    let query = ""

    if (queryObj?.pagination) {
        query = "?"
        Object.entries(queryObj.pagination).forEach(([key, value], i) => {
            if (i != 0) query += "&"
            query += `${key}=${value}`
        })
    }

    if (queryObj?.filter) {
        query = query ? query + "&" : "?"

        Object.entries(queryObj.filter).forEach(([key, value], i) => {
            if (i != 0) query += "&"
            query += `${key}=${value}`
        })
    }

    return query
}


export interface createFetchCallInterface {
    expectedStatus?: number,
    fetchOptions?: { [key: string]: any },
    url: string,
    query?: ApiRequestParams
}

export const createFetchCall = <returnType>(options: createFetchCallInterface) => {
    return new Promise<returnType>((resolve, reject) => {
        const { url, query, fetchOptions={}, expectedStatus=200 } = options
        let forceReject = false
        const token = window.localStorage.getItem("token")
        const headers = fetchOptions?.headers || {}
        const fullUrl = url + buildQueryString(query)

        //add the default headers and append the remaining provieded headers
        fetchOptions.headers = {
            "Content-Type": "application/json",
            "authorization": "bearer " + token,
            ...headers,
        }

        // set method to "GET" if no method is provided
        if (!fetchOptions.method) fetchOptions.method = "GET"

        fetch(fullUrl, fetchOptions)
            .then(res => {
                if (res.status !== expectedStatus) {
                    forceReject = true
                } else if (res.status !== 204 ){
                    return res.json()
                } else {
                    return
                }
            })
            .then(json => {
                if (forceReject) {
                    reject(json)
                } else {
                    resolve(json)
                }
            }).catch(e => {
                reject(e)
            })
    })
}