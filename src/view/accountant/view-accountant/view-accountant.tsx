import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmployeeList from "../../client/view-user/components/employee/employee";
import PersonalUser from "../../client/view-user/components/personal";
import PersonalUserHook from "../../client/view-user/hooks/personal-user.hook";
import { IAccountant } from "../models/accountant.model";

function ViewAccountant() {
    const {
        user
    } = PersonalUserHook<IAccountant>();
    return (
        <div>
            <h5>{user?.organization_name}</h5>
            <Tabs
                defaultActiveKey="staff"
                id="uncontrolled-tab-example"
                className="mb-3"
            // onSelect={(k) => changeTab(k)}
            >

                <Tab eventKey="staff" title="Աշխատակիցներ">
                    <EmployeeList />
                </Tab>
                <Tab eventKey="personal" title="Անձնական տվյալներ">
                    <PersonalUser user={user} />
                </Tab>
            </Tabs>
        </div>


    )
}
export default ViewAccountant;