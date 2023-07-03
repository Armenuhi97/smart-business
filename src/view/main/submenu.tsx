import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as RiIcons from 'react-icons/ri';
import './main.scss';
import { logout } from "../../services/API";

const SidebarLink = styled(NavLink)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background-color: #32a7e2;
    color: #fff;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(NavLink)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background-color: #32a7e2;
    color: #fff;
    cursor: pointer;
  }
`;

const SubMenu = (props: any) => {
  const [subnav, setSubnav] = useState(false);
  //  className={({ isActive }: any) => isActive ? 'active-item' : ''} 
  const showSubnav = () => setSubnav(!subnav);
  // function logout() {
  //   logout
  // }
  return (
    <>
      <SidebarLink className={!props.item.path ? 'none-active' : ''}
        to={props.item.path ? props.item.path : '#'}
        onClick={() => {
          if (props.item.path === '/auth') {
            logout(false);
            return;
          }
          props.item.subNav ? showSubnav() : props.showSubnav()
        }}
      >
        <div >
          {props.item.icon}
          <SidebarLabel>{props.item.title}</SidebarLabel>
        </div>
        <div>
          {props.item.subNav && subnav
            ? <RiIcons.RiArrowUpSFill />
            : props.item.subNav
              ? <RiIcons.RiArrowDownSFill />
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        props?.item?.subNav?.map((item: any, index: number) => {
          return (
            <DropdownLink onClick={props.showSubnav} to={item.path} key={index}>
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;