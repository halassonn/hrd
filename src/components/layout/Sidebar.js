import React from "react";
import { SideMenu } from "./Components";

function Sidebar(props) {
  const { open, doOpen, children, user, kantor } = props;
  return <SideMenu open={open}>{children}</SideMenu>;
}

export default Sidebar;
