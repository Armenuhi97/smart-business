export interface IUser {
    id?: number;
    first_name: string;
    phone_number: string;
    last_name: string;
    email: string;
    birth_date: string | Date;
    password?: string;
}