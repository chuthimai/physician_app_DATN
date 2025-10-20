import type MedicalSpecialty from "@/types/models/MedicalSpecialty.ts";
import type Qualification from "@/types/models/Qualification.ts";

export interface User {
    id: number,
    name: string,
    telecom: string | null,
    email: string | null,
    gender: boolean,
    birthDate: Date | undefined,
    photo: string | null,
    role: string,
    address?: string | null,
    startDate: Date,
    specialty: MedicalSpecialty,
    qualifications: Qualification[],
}