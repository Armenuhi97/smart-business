import React, { useState } from "react";
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
import AddAccountantForClient from './components/add-accountant/components/add-accountant';

function ViewUser() {
    const [key, setKey] = useState<string>("organization");

    const {
        dispatch,
        params,
        modalShow,
        handleClose,
        // handleSave,
        setModalShow
    } = ListHook<UserDetail>();
    const {
        user
    } = PersonalUserHook<UserDetail>(params, dispatch);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h5>{user?.user?.first_name} {user?.user?.last_name}</h5>
                <Button onClick={() => setModalShow!(true)} className="ml-2">Կցել հաշվապահ</Button>
            </div>
            {!!user &&
                <div>
                    <Tabs
                        // defaultActiveKey="organization"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        activeKey={key}
                        onSelect={(k) => setKey(k!)}
                    >
                        <Tab eventKey="organization" title="Կազմակերպություններ">
                            {key === 'organization' && <OrganizationList type={'client_id'} />}
                        </Tab>
                        <Tab eventKey="staff" title="Աշխատակիցներ">
                            {key === 'staff' && <EmployeeList type={'client_id'} />}
                        </Tab>
                        <Tab eventKey="personal" title="Անձնական տվյալներ">
                            {key === 'personal' && <PersonalUser user={user} />}
                        </Tab>
                    </Tabs>

                    <AddAccountantForClient
                        clientId={user.id}
                        show={modalShow}
                        onHide={handleClose}
                        type={'accountant'}
                        title={'Հաշվապահ'}
                        onSave={(evt: any) => handleClose()}
                    />
                </div>
            }

        </div>


    )
}
export default ViewUser;