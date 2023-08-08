export interface ILogin {
    email: string;
    password: string;
    loggedInSuccessfully: () => void;
}
export interface ILoginResponse {
    access: string;
    refresh: string;
}