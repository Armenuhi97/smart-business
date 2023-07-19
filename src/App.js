import React from "react";
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivatePage from './view/accessPage/privatePage.tsx';
import PublicPage from './view/accessPage/publicPage.tsx';
import Login from './view/login/login.tsx';
import Main from './view/main/main';
import ClientList from './view/client/client-list/client-list';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="auth" element={<PublicPage><Login /></PublicPage>} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="dashboard" element={<PrivatePage><Main /></PrivatePage>}>
          <Route path="/dashboard" element={<Navigate to='users' />} />
          <Route path='users' element={<ClientList />}></Route>
          {/* <Route path="users/:roleId" element={<OnlyAdminPage initialValue={initialValue.roleId}><User /></OnlyAdminPage>} >
              <Route path="" element={<Navigate to="list" />} />
              <Route path='list' element={<UserList />}></Route>
              <Route path="user/:id" element={<UserPersonal />} />
              <Route path="user/create" element={<UserPersonal />} />
            </Route> */}
        </Route>

        {/* <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} /> */}

      </Routes>
    </div>
  );
}

export default App;
