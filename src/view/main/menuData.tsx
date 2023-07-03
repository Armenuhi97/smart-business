import React from "react";
import * as AiIcons from "react-icons/ai";
const mainRoute = '/dashboard';

export const AdminData = [{
  title: "Клиенты",
  path: `${mainRoute}/users/3`,
  icon: <AiIcons.AiOutlineUser />,
  cName: "nav-text"
},
{
  title: "Юридические клиенты",
  path: `${mainRoute}/users/2`,
  icon: <AiIcons.AiOutlineUser />,
  cName: "nav-text"
},
{
  title: "Модераторы",
  path: `${mainRoute}/users/1`,
  icon: <AiIcons.AiOutlineUser />,
  cName: "nav-text"
},
{
  title: "Видео",
  path: `${mainRoute}/video`,
  icon: <AiIcons.AiFillVideoCamera />,
  cName: "nav-text"
},
{
  title: "Компании",
  path: `${mainRoute}/company`,
  icon: <AiIcons.AiTwotoneBuild />,
  cName: "nav-text"
},
{
  title: "Настройки",
  icon: <AiIcons.AiFillSetting />,
  subNav: [
    {
      title: "Категории",
      path: `${mainRoute}/category`,
    },
    {
      title: "Страны",
      path: `${mainRoute}/country`,
    }

  ],
  cName: "nav-text"
},

{
  title: "Отзывы",
  path: `${mainRoute}/review`,
  icon: <AiIcons.AiFillStar />,
  cName: "nav-text"
}];

