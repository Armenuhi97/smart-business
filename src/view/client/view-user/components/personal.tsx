import React from "react";
import moment from "moment";

function PersonalUser({ user }: { user: any }) {

    return (
        <div className="text-start">
            <div>
                <b>Անուն Ազգանուն:</b>
                <span> {user?.first_name} {user?.last_name}</span></div>
            <div className="mt-2">
                <b>Էլ․հասցե:</b>
                <span> {user?.email}</span>
            </div>
            <div className="mt-2">
                <b>Հեռախոսահամար:</b>
                <span> {user?.phone_number}</span>
            </div>
            <div className="mt-2">
                <b>Ծննդյան ամսաթիվ:</b>
                <span> {user?.birth_date ? moment(user?.birth_date).format('DD.MM.YYYY') : ''}</span>
            </div>

        </div>
    )
}
export default PersonalUser;