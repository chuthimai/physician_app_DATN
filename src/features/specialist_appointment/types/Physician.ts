import type MedicalSpecialty from "./MedicalSpecialty.ts";

export default interface Physician {
    identifier: number,
    name: string,
    gender: boolean,
    medicalSpecialty: MedicalSpecialty,
}