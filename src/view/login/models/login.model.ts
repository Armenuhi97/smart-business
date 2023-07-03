export interface ILogin {
    username: string;
    password: string;
    loggedInSuccessfully: () => void;
}
export interface ILoginResponse {
    access: string;
    refresh: string;
}