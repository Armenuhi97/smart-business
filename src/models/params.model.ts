export interface IParams {
    page: number;
    search?: string;
    id?: number;
    offset?: number;
}
export interface ParamsWithId extends IParams {
    [type: string]: number | undefined | null | string;
}