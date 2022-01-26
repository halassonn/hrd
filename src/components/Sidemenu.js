import React from "react";
import { FaUsers } from "react-icons/fa";
import { AiOutlineSetting, AiOutlineStock } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp, MdDashboard } from "react-icons/md";

import Menuitem from "./Menuitem";
import { Mul } from "./layout/Components";

const sidbardata = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
    iconClosed: <MdArrowDropDown />,
    iconOpened: <MdArrowDropUp />,
    subNav: null,
  },
  {
    title: "Karyawan",
    path: "/karyawan",
    icon: <FaUsers />,
    iconClosed: <MdArrowDropDown />,
    iconOpened: <MdArrowDropUp />,
    subNav: null,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: <AiOutlineSetting />,
    // iconClosed: <MdArrowDropDown />,
    // iconOpened: <MdArrowDropUp />,
    subNav: [],
  },
];

function Sidemenu(props) {
  // const { level } = useContext(AuthContext);
  // const { setApp } = useContext(GlobalContext);
  const { open } = props;
  return (
    <Mul>
      {sidbardata.map((e, i) => (
        <Menuitem key={i} item={e} open={open} />
      ))}
    </Mul>
  );
}

export default Sidemenu;
