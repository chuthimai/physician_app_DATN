import type MedicalSpecialty from "@/types/MedicalSpecialty.ts";
import type Qualification from "@/types/Qualification.ts";

export interface LoginResponse {
    identifier: number,
    name: string,
    telecom: string | null,
    email: string | null,
    gender: string,
    birthDate: Date,
    photo: string | null,
    role: string,
    address: string | null,
    startDate: Date,
    endDate: Date,
    qualifications: Qualification[],
    specialty: MedicalSpecialty,
    token: string,
}