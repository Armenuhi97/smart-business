export interface IParams {
    page: number;
    id?: number;
    offset?: number;
}
export interface ParamsWithId extends IParams {
    [type: string]: number | undefined | null;
}