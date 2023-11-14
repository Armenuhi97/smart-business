import React, { useState } from "react";
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
import OrganizationList from "../../organization/component/organization-list/organization-list";
import { UserDetail } from "../../client/models/user.model";
import { Button } from "react-bootstrap";
import AddAccountantForClient from '../../client/view-user/components/add-accountant/components/add-accountant';

function ViewAccountant() {
    const [key, setKey] = useState<string>("staff");

    const {
        dispatch,
        params,
        setModalShow,
        modalShow,
        handleClose
    } = ListHook<UserDetail>();
    const {
        user,
        paramsId
    } = PersonalUserHook<UserDetail>(params, dispatch);
    return (
        <div>

            <div className="d-flex align-items-center justify-content-between">
                <h5>{user?.company_name}</h5>
                <Button onClick={() => setModalShow!(true)} className="ml-2">Կցել հաճախորդ</Button>
            </div>

            {user && <div>
                <Tabs
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    activeKey={key}
                    onSelect={(k) => setKey(k!)}
                // onSelect={(k) => changeTab(k)}
                >
                    <Tab eventKey="staff" title="Աշխատակիցներ">
                        {key === 'staff' && <EmployeeList type={'client_id'} />}
                    </Tab>
                    <Tab eventKey="organization" title="Կազմակերպություններ">
                        {key === 'organization' && <OrganizationList type={'acc_id'} />}
                    </Tab>
                    <Tab eventKey="client" title="Հաճախորդներ">
                        {key === 'client' && <ClientList type={'acc_id'} />}
                    </Tab>
                    <Tab eventKey="broker" title="Գործակալ">
                        {key === 'broker' && <BrokerList />}
                    </Tab>
                    {/*  */}

                    <Tab eventKey="lawyer" title="Իրավաբան"></Tab>
                    {/*  */}
                    <Tab eventKey="personal" title="Անձնական տվյալներ">
                        {key === 'personal' && <PersonalAccountant user={user} />}
                    </Tab>
                </Tabs>

                <AddAccountantForClient
                    clientId={user.id}
                    show={modalShow}
                    onHide={handleClose}
                    type={'client'}
                    title={'Հաճախորդ'}
                    onSave={(evt: any) => handleClose()}
                />
            </div>}
        </div>
    )
}
export default ViewAccountant;