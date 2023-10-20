export interface IParams {
    page: number;
    id?: number;
}
export interface WithClientId extends IParams {
    clientId: number | undefined;
}