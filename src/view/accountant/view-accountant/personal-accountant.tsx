import React from "react";
import { IAccountant } from "../models/accountant.model";

function PersonalAccountant({ user }: { user: IAccountant }) {

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
            <div className="mt-2">
                <b>Հաճախորդների քանակ:</b>
                <span> {user?.user_count}</span>
            </div>

        </div>
    )
}
export default PersonalAccountant;