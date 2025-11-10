export interface Service {
    identifier: number,
    name: string,
    active: boolean,
    type: string,
    price: number,
    location?: string,
    note?: string,
}