import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, AuthContext } from "../../context";
import { Mainwrapper } from "./Components";
import Axios from "../../config";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Sidemenu from "../Sidemenu";

import { MdLogout } from "react-icons/md";

function Main(props) {
  const { children } = props;
  const { app } = useContext(GlobalContext);
  const { user_details, username, logout } = useContext(AuthContext);
  const [open, setopen] = useState(false);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    const getParameter = async () => {
      try {
      } catch (error) {}
    };

    getParameter();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Mainwrapper open={open}>
      <Header>
        <h2>PT BPR PELANGI</h2>
        <h2>
          <MdLogout
            onClick={logout}
            style={{ paddingRight: "25px", cursor: "pointer" }}
          />
        </h2>
      </Header>
      {/* <Sidebar open={open}>
        <Sidemenu open={open} />
      </Sidebar> */}
      <main>{children}</main>
    </Mainwrapper>
  );
}
export default Main;
