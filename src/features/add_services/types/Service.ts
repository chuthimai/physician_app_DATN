export type Service = {
    identifier: number,
    name: string,
    active: boolean,
    type: string,
    detailDescription?: string | null,
    price: number,
    location?: string,
    note?: string,
}