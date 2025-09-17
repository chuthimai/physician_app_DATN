export interface PatientResponse {
    identifier: number;
    name: string;
    gender: string;
    birthDate: string;
    address: string;
    telecom?: string;
}