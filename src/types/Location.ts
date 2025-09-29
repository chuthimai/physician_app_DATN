export default interface Location {
    identifier: number,
    name: string,
    type: string,
    partOf?: Location,
}