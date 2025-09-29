export default interface Qualification {
    identifier: number,
    name: string,
    specialty: string,
    issuer: string,
    type: string,
    effectiveDate: string,
    expiredDate: string | null,
}