import { UserDetail } from "../../client/models/user.model";

export type InviteTypes = 'new' | 'rejected' | 'accepted';

export interface IInvite {
    id: number;
    type: InviteTypes;
    description: string | null;
    created_at: string;
    user: UserDetail;
}
export interface InviteBody {
    sendData: { type: InviteTypes };
    id: number;
    createSuccessfully: () => void;
}

export enum InviteStatus {
    'new' = 'Նոր',
    'accepted' = 'Ջնջված',
    'rejected' = 'Չեղարկված'
}