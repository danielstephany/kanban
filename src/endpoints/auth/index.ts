import type {
    signupPayloadInterface,
    signupResponseInterface,
    loginPayloadInterface,
    errorMessageInterface
} from './types.ts'


export const signup = (data: signupPayloadInterface) => new Promise<signupResponseInterface | errorMessageInterface>((resolve, reject) => {
    
    fetch(`${process.env.KANBAN_API}/auth/signup`, {
        method: "POST",
        headers: {
            ContentType: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        resolve(json)
    }).catch(e => {
        reject(e)
    })
})

export const login = (data: loginPayloadInterface) => new Promise<{[key: string]: string} | errorMessageInterface>((resolve, reject) => {
    
    fetch(`${process.env.KANBAN_API}/auth/login`, {
        method: "POST",
        headers: {
            ContentType: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        resolve(json)
    }).catch(e => {
        reject(e)
    })
})
