export default interface Patient {
    identifier: number,
    name: string,
    email?: string | null,
    gender: boolean,
    birthDate: Date,
    address?: string,
    telecom?: string | null,
}