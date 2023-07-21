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
    path: ``,
    icon: <FaIcons.FaToiletPaper />,
    cName: "nav-text"
  },

  {
    title: 'Բրոքեր',
    path: ``,
    icon: <FaIcons.FaUserGraduate />,
    cName: "nav-text"
  },
  {
    title: 'Իրավաբան',
    path: ``,
    icon: <FaIcons.FaUserGraduate />,
    cName: "nav-text"
  },
  {
    title: 'Կազմակերպություններ',
    path: ``,
    icon: <GiIcons.GiPostOffice />,
    cName: "nav-text"
  },
  {
    title: 'Կարգավորումներ',
    path: ``,
    icon: <IoIcons.IoIosSettings />,
    cName: "nav-text"
  },
  {
    title: "Ելք",
    icon: <BiIcons.BiLogOut />,
    path:'/auth',
    cName: "nav-text"
  },
];

