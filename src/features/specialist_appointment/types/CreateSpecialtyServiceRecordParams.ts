export default interface CreateSpecialtyServiceRecordParams {
    patientRecordIdentifier?: number,
    workScheduleIdentifier: number,
    physicianIdentifier?: number,
    request: string,
}