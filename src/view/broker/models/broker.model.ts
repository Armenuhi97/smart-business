import { IUser } from "../../client/models/user.model";

export interface IBroker {
    id?: number;
    phone_number: string;
    email: string;
    company_name: string;
    tin: string;
    password?: string;
    user?:IUser;
}