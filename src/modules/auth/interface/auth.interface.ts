export interface AuthPayload{
    id: string,
    name: string,
    permissions: string[],
    roles: string[]
}

export interface UserPayload{
    sub: number,
    email: string,
    permissions: string[],
    iat: number,
    exp: number
}