
export interface signupPayloadInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
}

export interface user {
    createdAt: string,
    email: string,
    firstName: string,
    lastName: string,
    updatedAt: string,
    _id: string,
}

export interface loginResult {
    token: string,
    user: user
}

export interface signupResponseInterface extends loginResult { }

export interface loginPayloadInterface {
    email: string,
    password: string,
}

export interface verifyTokenResult { user: user}