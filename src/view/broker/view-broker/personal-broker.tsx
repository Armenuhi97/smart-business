import React from "react";
import { IBroker } from "../models/broker.model";

function PersonalBroker({ user }: { user: IBroker }) {

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
                <span> {user?.email}</span>
            </div>
            <div className="mt-2">
                <b>Հեռախոսահամար:</b>
                <span> {user?.phone_number}</span>
            </div>
                    </div>
    )
}
export default PersonalBroker;