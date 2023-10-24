import { UserDetail } from "../../client/models/user.model";

export interface IOrganization {
    id?: number;
    image?: string;
    name?: string;
    hvhh?: string;
    tin?: string;
    creator?: number;
    accountant_worker?: number;
    address?: IAddress[];
    managers?: UserDetail[];
    showImage?: string;
    file?: File | null;
}
interface IAddress {
    id?: number;
    name: string;
}