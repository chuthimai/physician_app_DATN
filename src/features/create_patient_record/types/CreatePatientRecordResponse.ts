export interface CreatePatientRecordResponse {
    identifier: number,
    status: boolean,
    createTime: Date,
    patientIdentifier: number,
    patient: {
        name: string,
        email: string | null,
        gender: boolean,
        birthDate: Date,
        // address: string,
        telecom: string | null,
    },
}