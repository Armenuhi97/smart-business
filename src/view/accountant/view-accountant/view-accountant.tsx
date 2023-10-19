import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmployeeList from "../../client/view-user/components/employee/employee";
import PersonalUser from "../../client/view-user/components/personal";
import PersonalUserHook from "../../client/view-user/hooks/personal-user.hook";
import { IAccountant } from "../models/accountant.model";
import PersonalAccountant from "./personal-accountant";
import ClientList from "../../client/client-list/client-list";
import BrokerList from "../../broker/broker-list/broker-list";
import ListHook from "../../../utils/hooks/list.hook";

function ViewAccountant() {
    const {
        dispatch,
        params
    } = ListHook<IAccountant>();
    const {
        user,
        paramsId
    } = PersonalUserHook<IAccountant>(params, dispatch);
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
                    <EmployeeList  userId={user?.id}/>
                </Tab>
                <Tab eventKey="client" title="Հաճախորդներ">
                    <ClientList paramsId={paramsId} />
                </Tab>
                <Tab eventKey="broker" title="Գործակալ">
                    <BrokerList />
                </Tab>
                {/*  */}

                <Tab eventKey="lawyer" title="Իրավաբան"></Tab>
                {/*  */}
                <Tab eventKey="personal" title="Անձնական տվյալներ">
                    <PersonalAccountant user={user} />
                </Tab>
            </Tabs>
        </div>


    )
}
export default ViewAccountant;