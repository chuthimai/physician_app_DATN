export interface User {
    id: number,
    name: string,
    telecom: string,
    email: string,
    gender: boolean,
    birthDate: Date,
    photo: string | undefined,
    role: string,
}