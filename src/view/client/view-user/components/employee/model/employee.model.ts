import { UserDetail } from "../../../../models/user.model";

export interface IEmployeeObjectType {
    id?: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    password?: string;
}


export interface IEmployee extends UserDetail {}