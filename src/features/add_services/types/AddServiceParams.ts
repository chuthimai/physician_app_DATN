export type AddServiceParams = {
    patientRecordIdentifier: number,
    serviceInfo: ServiceInfo[],
}

export type ServiceInfo = {
    serviceIdentifier: number,
    serviceRequest: string,
}