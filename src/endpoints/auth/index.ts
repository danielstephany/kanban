import type {
    signupPayloadInterface,
    signupResponseInterface,
    loginPayloadInterface,
    loginResult,
    verifyTokenResult
} from './types.ts'


export const signup = (data: signupPayloadInterface) => new Promise<signupResponseInterface>((resolve, reject) => {
    let forceReject = false;
    fetch(`${process.env.KANBAN_API}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status !== 200){
            forceReject = true
        }
        return res.json()
    })
    .then(json => {
        if(forceReject){
            reject(json)
        } else {
            resolve(json)
        }
    }).catch(e => {
        reject(e)
    })
})

export const login = (data: loginPayloadInterface) => new Promise<loginResult>((resolve, reject) => {
    let forceReject = false;
    fetch(`${process.env.KANBAN_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.status !== 200) {
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

export const verifyToken = () => new Promise<verifyTokenResult>((resolve, reject) => {
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
