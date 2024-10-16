
export interface signupPayloadInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
}

export interface signupResponseInterface extends Omit<signupPayloadInterface, "password" | "password2"> { }

export interface loginPayloadInterface {
    email: string,
    password: string,
}

export interface loginResult {
    token: string,
    user: {
        createdAt: string,
        email: string,
        firstName: string,
        lastName: string,
        updatedAt: string,
        _id: string,
    }
}