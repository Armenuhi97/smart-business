import { IUser } from "../../client/models/user.model";

export interface IAccountant {
    id?: number;
    phone_number: string;
    email: string;
    company_name: string;
    tin: string;
    user_count?: number;
    password?: string;
    user?: IUser;
    is_acc_active?: boolean;
}