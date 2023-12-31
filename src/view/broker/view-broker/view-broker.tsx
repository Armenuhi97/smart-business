import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmployeeList from "../../client/view-user/components/employee/employee";
import PersonalUser from "../../client/view-user/components/personal";
import PersonalUserHook from "../../client/view-user/hooks/personal-user.hook";
import ClientList from "../../client/client-list/client-list";
import { IBroker } from "../models/broker.model";
import PersonalBroker from "./personal-broker";
import AccountantList from "../../accountant/client-list/accountant-list";
import ListHook from "../../../utils/hooks/list.hook";

function ViewBroker() {
    const {
        dispatch,
        params
    } = ListHook<IBroker>();
    const {
        user,
        paramsId
    } = PersonalUserHook<IBroker>(params,dispatch);
    return (
        <div>
            <h5>{user?.company_name}</h5>
            <Tabs
                defaultActiveKey="staff"
                id="uncontrolled-tab-example"
                className="mb-3"
            // onSelect={(k) => changeTab(k)}
            >

                <Tab eventKey="staff" title="Աշխատակիցներ">
                    <EmployeeList  type={'broker_id'}/>
                </Tab>
                <Tab eventKey="client" title="Հաճախորդներ">
                    <ClientList type={'broker_id'} />
                </Tab>
                <Tab eventKey="accountant" title="Հաշվապահներ">
                    <AccountantList />
                </Tab>
                <Tab eventKey="personal" title="Անձնական տվյալներ">
                    <PersonalBroker user={user} />
                </Tab>
            </Tabs>
        </div>


    )
}
export default ViewBroker;