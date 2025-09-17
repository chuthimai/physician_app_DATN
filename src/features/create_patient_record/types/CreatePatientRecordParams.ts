export interface CreatePatientRecordParams {
    patientIdentifier: number | null,
    name: string,
    email: string | null,
    telecom: string,
    gender: boolean,
    birthDate: string,
    address: string,
    password: string,
}