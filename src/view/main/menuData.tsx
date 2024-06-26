import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

const mainRoute = '/dashboard';

export const AdminData = [
  {
    title: 'Հաճախորդ',
    path: `${mainRoute}/users`,
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text"
  },
  {
    title: 'Հաշվապահ',
    path: `${mainRoute}/accountant`,
    icon: <FaIcons.FaToiletPaper />,
    cName: "nav-text"
  },

  {
    title: 'Գործակալ',
    path: `${mainRoute}/broker`,
    icon: <FaIcons.FaBuilding />,
    cName: "nav-text"
  },
  {
    title: 'Իրավաբան',
    path: `${mainRoute}/lawyer`,
    icon: <FaIcons.FaUserGraduate />,
    cName: "nav-text"
  },
  {
    title: 'Ջնջելու հայտեր',
    path: `${mainRoute}/invites`,
    icon: <GiIcons.GiPostOffice />,
    cName: "nav-text"
  },
  {
    title: 'Կազմակերպություններ',
    path: `${mainRoute}/organization`,
    icon: <GiIcons.GiPostOffice />,
    cName: "nav-text"
  },
  {
    title: 'Կարգավորումներ',
    path: ``,
    icon: <IoIcons.IoIosSettings />,
    cName: "nav-text",
    subNav: [
      {
        title: "Բանկ",
        path: `${mainRoute}/bank`,
      },
      {
        title: "Չափումներ",
        path: `${mainRoute}/measurement`
      },
    ]
  },
  {
    title: "Ելք",
    icon: <BiIcons.BiLogOut />,
    path: '/auth',
    cName: "nav-text"
  },
];

