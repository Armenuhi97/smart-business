import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PersonalUserHook from "../../client/view-user/hooks/personal-user.hook";
import ClientList from "../../client/client-list/client-list";
import AccountantList from "../../accountant/client-list/accountant-list";
import { ILawyer } from "../models/lawyer.model";
import PersonalLawyer from "./personal-lawyer";
import ListHook from "../../../utils/hooks/list.hook";

function ViewLawyer() {
    const {
        dispatch,
        params
    } = ListHook<ILawyer>();
    const {
        user,
        paramsId
    } = PersonalUserHook<ILawyer>(params,dispatch);
    return (
        <div>
            <h5>{user?.company_name}</h5>
            <Tabs
                defaultActiveKey="staff"
                id="uncontrolled-tab-example"
                className="mb-3"
            // onSelect={(k) => changeTab(k)}
            >
                <Tab eventKey="client" title="Հաճախորդներ">
                    <ClientList paramsId={paramsId} />
                </Tab>
                <Tab eventKey="accountant" title="Հաշվապահներ">
                    <AccountantList />
                </Tab>
                <Tab eventKey="personal" title="Անձնական տվյալներ">
                    <PersonalLawyer user={user} />
                </Tab>
            </Tabs>
        </div>
    )
}
export default ViewLawyer;