import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers, FaCreditCard, FaBagShopping } from "react-icons/fa6";

export type NavItem = NavGroup | NavLink;

export type NavGroup = {
  type: "group";
  name: string;
  links: NavLink[];
};

export type NavLink = {
  type: "link";
  title: string;
  path: string;
  icon: React.ReactNode;
};

export const NavItems: NavItem[] = [
  {
    type: "link",
    title: "Home",
    path: "/",
    icon: <BiSolidDashboard />,
  },
  {
    type: "group",
    name: "Main Menu",
    links: [
      {
        type: "link",
        title: "Customers",
        path: "/customers",
        icon: <FaUsers />,
      },
      {
        type: "link",
        title: "Cards",
        path: "/cards",
        icon: <FaCreditCard />,
      },
      {
        type: "link",
        title: "Transactions",
        path: "/transactions",
        icon: <FaBagShopping />,
      },
    ],
  },
];
