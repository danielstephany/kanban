export interface createFetchCallInterface {
    expectedStatus?: number
    url: string,
    fetchOptions: { [key: string]: any },
}

export const createFetchCall = <returnType>(options: createFetchCallInterface) => {
    return new Promise<returnType>((resolve, reject) => {
        const { url, fetchOptions, expectedStatus=200 } = options
        let forceReject = false
        const token = window.localStorage.getItem("token")

        if (!fetchOptions?.headers) fetchOptions.headers = {}

        fetchOptions.headers = {
            ...fetchOptions.headers,
            "Content-Type": "application/json",
            "authorization": "bearer " + token
        }

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