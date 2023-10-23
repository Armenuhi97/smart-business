export interface UserDetail {
    avatar_image:string;
    birth_date:string;
    company_name:string;
    cover_image:string;
    employer:number;
    id:number;
    language:string;
    legal_type:number;
    phone_number:string;
    tin:string;
    user: IUser;
    is_deleted:boolean;
    task_types: any[];
    accountant: any;
}
export interface IUser{
        date_joined?: string;
        email: string;
        first_name: string;
        is_active?: boolean;
        last_name: string;
        username?: string;

        phone_number?:string;
        birth_date?:string | Date;
        id?:number;
        password?:string;
}