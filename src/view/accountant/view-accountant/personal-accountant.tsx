import React from "react";
import { baseUrl } from "../../../services/API";
import { UserDetail } from "../../client/models/user.model";

function PersonalAccountant({ user }: { user: UserDetail }) {

    return (
        <div className="text-start">
            {user?.avatar_image && <img height={100} width={100} className="object-fit-contain m-auto" src={baseUrl + user?.avatar_image} alt="" />}

            <div className="mt-2">
                <b>Կամակերպության անուն:</b>
                <span> {user?.company_name}</span></div>
            <div className="mt-2">
                <b>ՀՎՀՀ:</b>
                <span> {user?.tin}</span>
            </div>
            <div className="mt-2">
                <b>Էլ․հասցե:</b>
                <span> {user?.user?.email}</span>
            </div>
            <div className="mt-2">
                <b>Հեռախոսահամար:</b>
                <span> {user?.phone_number}</span>
            </div>
            <div className="mt-2">
                <b>Հաճախորդների քանակ:</b>
                <span> </span>
            </div>

        </div>
    )
}
export default PersonalAccountant;