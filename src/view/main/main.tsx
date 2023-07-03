import React, { useState } from 'react';

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Outlet } from "react-router-dom";

import './main.scss';

import {  AdminData } from './menuData';
import SubMenu from './submenu';


function Main() {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <IconContext.Provider value={{ color: "#FFF" }}>
      <div className="navbar">
        <div className="menu-bars">
          <FaIcons.FaBars onClick={showSubnav} />
          <img className='mx-4' src="/images/png/logo2.png" alt="" />
        </div>
      </div>
      <nav className={subnav ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" >
          <li className="navbar-toggle" >
            <div className="menu-bars w-100 d-flex align-items-center">
              <img className='mx-4' src="/images/png/logo2.png" alt="" />
              <span onClick={showSubnav} className='ml-auto'>
                <AiIcons.AiOutlineClose />
              </span>
            </div>
          </li>
          { AdminData.map((item, index) => {
            return (
              <SubMenu subnav={subnav} setSubnav={setSubnav} showSubnav={showSubnav} item={item} key={index} />
            );
          })}
        </ul>
      </nav >
      <div className='route'>
        <Outlet />
      </div>
    </IconContext.Provider >
  )
}
export default Main;


