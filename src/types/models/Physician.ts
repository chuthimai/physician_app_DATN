import type MedicalSpecialty from "@/types/models/MedicalSpecialty.ts";

export default interface Physician {
    identifier: number,
    name: string,
    gender?: boolean,
    specialty?: MedicalSpecialty,
}