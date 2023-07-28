import React from "react";
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivatePage from './view/accessPage/privatePage.tsx';
import PublicPage from './view/accessPage/publicPage.tsx';
import Login from './view/login/login.tsx';
import Main from './view/main/main';
import ClientList from './view/client/client-list/client-list';
import AddEditClient from './view/client/add-edit-client/add-edit-client';
import Client from './view/client/client';
import ViewClient from './view/client/view-user/view-user';
import Accountant from './view/accountant/accountant';
import AccountantList from './view/accountant/client-list/accountant-list';
import ViewAccountant from './view/accountant/view-accountant/view-accountant';


import Broker from './view/broker/broker';
import BrokerList from './view/broker/broker-list/broker-list';
import ViewBroker from './view/broker/view-broker/view-broker';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="auth" element={<PublicPage><Login /></PublicPage>} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="dashboard" element={<PrivatePage><Main /></PrivatePage>}>
          <Route path="/dashboard" element={<Navigate to='users' />} />
          {/* <Route path='users' element={<ClientList />}></Route>
          <Route path='user-create' element={<AddEditClient />}></Route>
          <Route path='user/:id' element={<AddEditClient />}></Route> */}

          <Route path="users" element={<Client />} >
            <Route path="" element={<Navigate to="list" />} />
            <Route path='list' element={<ClientList />}></Route>
            <Route path="user/:id" element={<AddEditClient />} />
            <Route path="create" element={<AddEditClient />} />
            <Route path="personal/:id" element={<ViewClient />} />
          </Route>

          <Route path="accountant" element={<Accountant />} >
            <Route path="" element={<Navigate to="list" />} />
            <Route path='list' element={<AccountantList />}></Route>
            <Route path="personal/:id" element={<ViewAccountant />} />
          </Route>

          <Route path="broker" element={<Broker />} >
            <Route path="" element={<Navigate to="list" />} />
            <Route path='list' element={<BrokerList />}></Route>
            <Route path="personal/:id" element={<ViewBroker />} />
          </Route>
        </Route>

        {/* <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} /> */}

      </Routes>
    </div >
  );
}

export default App;
