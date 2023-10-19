import React from "react";
import { UserDetail } from "../../models/user.model";
import { baseUrl } from "../../../../services/API";

function PersonalUser({ user }: { user: UserDetail }) {

    return (
        <div className="">
            <img height={50} width={50} src={baseUrl + user?.avatar_image} alt="" />
            <div className="mt-2">
                <div>
                    <b>Անուն Ազգանուն:</b>
                    <span> {user?.user?.first_name} {user?.user?.last_name}</span></div>
                <div className="mt-2">
                    <b>Էլ․հասցե:</b>
                    <span> {user?.user?.email}</span>
                </div>
                <div className="mt-2">
                    <b>Հեռախոսահամար:</b>
                    <span> {user?.phone_number}</span>
                    {/* <span> {user?.birth_date ? moment(user?.birth_date).format('DD.MM.YYYY') : ''}</span> */}
                </div>
            </div>
        </div>
    )
}
export default PersonalUser;