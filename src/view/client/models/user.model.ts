export interface IUser {
    id?: number;
    firstName: string;
    phoneNumber: string;
    lastName: string;
    email: string;
    birthDate: string | Date;
    password?: string;
}