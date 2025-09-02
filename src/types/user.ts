export interface User {
    id: number,
    name: string,
    telecom: string | null,
    email: string | null,
    gender: boolean,
    birthDate: Date,
    photo: string | null,
    role: string,
}