interface baseRouteData {
    basePath?: string,
    path: string,
}

interface routeData {
    basePath?: string,
    path: string,
    fullPath: string,
}

const createRouteData = (obj: baseRouteData):routeData => {
    return ({
        ...obj,
        fullPath: obj.basePath || "" + obj.path
    })
}

export const kanban = {
    path: "/dashboard"
}
export const signUp = { path: "/auth/signup" }
export const login = { path: "/auth/login" }