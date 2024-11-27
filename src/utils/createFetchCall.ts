export interface createFetchCallInterface {
    expectedStatus?: number,
    fetchOptions?: { [key: string]: any },
    url: string,
}

export const createFetchCall = <returnType>(options: createFetchCallInterface) => {
    return new Promise<returnType>((resolve, reject) => {
        const { url, fetchOptions={}, expectedStatus=200 } = options
        let forceReject = false
        const token = window.localStorage.getItem("token")
        const headers = fetchOptions?.headers || {}

        //add the default headers and append the remaining provieded headers
        fetchOptions.headers = {
            "Content-Type": "application/json",
            "authorization": "bearer " + token,
            ...headers,
        }

        // set method to "GET" if no method is provided
        if (!fetchOptions.method) fetchOptions.method = "GET"

        fetch(url, fetchOptions)
            .then(res => {
                if (res.status !== expectedStatus) {
                    forceReject = true
                }
                return res.json()
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