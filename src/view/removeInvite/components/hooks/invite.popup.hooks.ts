import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IInvite, InviteBody, InviteTypes } from "../../models/invite.model";
import { removeInvite } from "../../slice/invite.slice";
import { useAppDispatch } from "../../../../hooks";

function InvitePopupProps(editItem: IInvite | null, onSave: () => void) {
    const dispatch = useAppDispatch();

    // const handleSubmit = (e?: any): void => {
    //     if (e) {
    //         e.preventDefault();
    //     }
    //     sendCreateRequest();
    // }

    const changeInviteStatus = (type: InviteTypes) => {

        if (!!editItem) {
            const sendObject: InviteBody = {
                createSuccessfully: handelOnSave,
                sendData: { type },
                id: editItem!.id
            }
            dispatch(removeInvite(
                sendObject
            ));
        }
    }
    const handelOnSave = (): void => {
        onSave();
    }
    return {
        changeInviteStatus
    }
}
export default InvitePopupProps;