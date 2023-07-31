import React from "react";
import { ILawyer } from "../models/lawyer.model";

function PersonalLawyer({ user }: { user: ILawyer }) {

    return (
        <div className="text-start">
            <div>
                <b>Կամակերպության անուն:</b>
                <span> {user?.organization_name}</span></div>
            <div className="mt-2">
                <b>ՀՎՀՀ:</b>
                <span> {user?.hvhh}</span>
            </div>
            <div className="mt-2">
                <b>Էլ․հասցե:</b>
                <span> {user?.email}</span>
            </div>
            <div className="mt-2">
                <b>Հեռախոսահամար:</b>
                <span> {user?.phone_number}</span>
            </div>
        </div>
    )
}
export default PersonalLawyer;