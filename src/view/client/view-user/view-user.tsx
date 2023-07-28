import React from "react";
import PersonalUserHook from "./hooks/personal-user.hook";
import moment from "moment";
import PersonalUser from "./components/personal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OrganizationList from "./components/organization/organization";
import EmployeeList from "./components/employee/employee";
import { IUser } from "../models/user.model";

function ViewUser() {
    const {
        user
    } = PersonalUserHook<IUser>();
    return (
        <div>
            <h5>{user?.first_name} {user.last_name}</h5>
            <Tabs
                defaultActiveKey="organization"
                id="uncontrolled-tab-example"
                className="mb-3"
            // onSelect={(k) => changeTab(k)}
            >
                <Tab eventKey="organization" title="Կազմակերպություններ">
                    <OrganizationList />
                </Tab>
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
export default ViewUser;