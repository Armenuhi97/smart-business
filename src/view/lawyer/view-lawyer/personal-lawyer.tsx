import React from "react";
import { ILawyer } from "../models/lawyer.model";

function PersonalLawyer({ user }: { user: ILawyer }) {

    return (
        <div className="text-start">
            <div>
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
        </div>
    )
}
export default PersonalLawyer;