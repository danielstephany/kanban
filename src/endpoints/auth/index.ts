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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status !== 200){
            return reject(res.json())
        }
        return res.json()
    })
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.status !== 200) {
            return reject(res.json())
        }
        return res.json()
    })
    .then(json => {
        resolve(json)
    }).catch(e => {
        reject(e)
    })
})

export const verifyToken = () => new Promise<{[key: string]: string} | errorMessageInterface>((resolve, reject) => {
    const token = window.localStorage.getItem("token")
    fetch(`${process.env.KANBAN_API}/auth/varify-token`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    })
    .then(res => {
        if (res.status !== 200) {
            return reject(res.json())
        }
        return res.json()
    })
    .then(json => {
        resolve(json)
    }).catch(e => {
        reject(e)
    })
})
