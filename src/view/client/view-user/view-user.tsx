import React from "react";
import PersonalUserHook from "./hooks/personal-user.hook";
import moment from "moment";
import PersonalUser from "./components/personal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EmployeeList from "./components/employee/employee";
import { IUser, UserDetail } from "../models/user.model";
import OrganizationList from "../../organization/component/organization-list/organization-list";
import ListHook from "../../../utils/hooks/list.hook";
import { Button } from "react-bootstrap";

function ViewUser() {
    const {
        dispatch,
        params
    } = ListHook<UserDetail>();
    const {
        user
    } = PersonalUserHook<UserDetail>(params, dispatch);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h5>{user?.user?.first_name} {user?.user?.last_name}</h5>
                {/* <Button className="ml-2">Կցել հաշվապահ</Button> */}
            </div>
            {!!user && <Tabs
                defaultActiveKey="organization"
                id="uncontrolled-tab-example"
                className="mb-3"
            // onSelect={(k) => changeTab(k)}
            >
                <Tab eventKey="organization" title="Կազմակերպություններ">
                    <OrganizationList type={'client_id'} />
                </Tab>
                <Tab eventKey="staff" title="Աշխատակիցներ">
                    <EmployeeList type={'client_id'} />
                </Tab>
                <Tab eventKey="personal" title="Անձնական տվյալներ">
                    <PersonalUser user={user} />
                </Tab>
            </Tabs>}
        </div>


    )
}
export default ViewUser;