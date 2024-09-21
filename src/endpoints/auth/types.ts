
export interface signupPayloadInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
}

export interface signupResponseInterface extends Omit<signupPayloadInterface, "password" | "password2"> { }

export interface errorMessageInterface {
    message: string
}

export interface loginPayloadInterface {
    email: string,
    password: string,
}