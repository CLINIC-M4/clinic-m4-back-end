export interface IUserRequest {
    name: string
    email: string
    cpf:string
    password: string
    isAdm: boolean
}

export interface IUser {
    id: string
    name: string
    email: string
    cpf:string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    isActive?:boolean
    isAdm?:boolean
    id?: string
}

export interface IUpdateToken {
    email: string
    isAdm: boolean
    isActive: boolean
    cpf:string
    id: string
    iat: number
    exp: number
}