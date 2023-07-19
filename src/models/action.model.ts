export interface IAdd<T> {
    sendData: T;
    id?: string | number;
    createSuccessfully: (id?: number | string) => void;
}
export interface IModify<T> {
    id?: string | number;
    sendObject: T;
    updateSuccessfully?: (id?: string | number) => void;
}
export interface IDelete {
    id: string | number;
    page: number;
    deleteSuccessfully: (page: number) => void;
}