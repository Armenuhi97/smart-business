import React from "react";
import { UserDetail } from "../../models/user.model";
import { baseUrl } from "../../../../services/API";

function PersonalUser({ user }: { user: UserDetail }) {

    return (
        <div className=" d-flex m-auto flex-column width-fit">
            {user?.avatar_image && <img height={100} width={100} className="object-fit-contain m-auto" src={baseUrl + user?.avatar_image} alt="" />}
            <div className="mt-2">
                <div>
                    <b>Անուն Ազգանուն:</b>
                    <span> {user?.user?.first_name} {user?.user?.last_name}</span></div>
                <div className="mt-2 text-start">
                    <b>Էլ․հասցե:</b>
                    <span> {user?.user?.email}</span>
                </div>
                <div className="mt-2 text-start">
                    <b>Հեռախոսահամար:</b>
                    <span> {user?.phone_number}</span>
                    {/* <span> {user?.birth_date ? moment(user?.birth_date).format('DD.MM.YYYY') : ''}</span> */}
                </div>
            </div>
        </div>
    )
}
export default PersonalUser;