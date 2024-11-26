import { createFetchCall } from '@src/utils/createFetchCall.ts'

import type {
    boardsOwnedByUserResponseInterface,
    boardNavListResponseInterface,
    createBoardDataInterface,
    createBoardResponseInterface
} from './types.ts'


export const boardsOwnedByUser = () => new Promise<boardsOwnedByUserResponseInterface>((resolve, reject) => {
    let forceReject = false;
    const token = window.localStorage.getItem("token")
    fetch(`${process.env.KANBAN_API}/board/owned-by-user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token
        },
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

export const boardNavList = () => new Promise<boardNavListResponseInterface>((resolve, reject) => {
    let forceReject = false;
    const token = window.localStorage.getItem("token")
    fetch(`${process.env.KANBAN_API}/board/nav-list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token
        },
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

// export const createBoard = (data: createBoardDataInterface) => new Promise<createBoardResponseInterface>((resolve, reject) => {
//     let forceReject = false;
//     const token = window.localStorage.getItem("token")
    
//     fetch(`${process.env.KANBAN_API}/board`, {
//         method: "Post",
//         headers: {
//             "Content-Type": "application/json",
//             "authorization": "bearer " + token
//         },
//         body: JSON.stringify(data)
//     })
//     .then(res => {
//         if (res.status !== 200) {
//             forceReject = true
//         }
//         return res.json()
//     })
//     .then(json => {
//         if (forceReject) {
//             reject(json)
//         } else {
//             resolve(json)
//         }
//     }).catch(e => {
//         reject(e)
//     })
// })

export const createBoard = (data: createBoardDataInterface) => createFetchCall<createBoardResponseInterface>({
    url: `${process.env.KANBAN_API}/board`,
    fetchOptions: {
        method: "Post",
        body: JSON.stringify(data)
    }
})