import { useContext } from "react";
import { Switch, Redirect, Link } from "react-router-dom";
import { Mainlayout } from "../components/layout";

import { AuthContext } from "../context";
import Routeall from "./routescustom/Routeall";
import Home from "../pages/Home";
import RouteProtect from "./routescustom/Routeprotect";
import Routeradmin from "./routescustom/Routeradmin";
import Login from "../pages/login/Login";
import Admin from "../pages/admin/Admin";
import Settings from "../pages/admin/settings/Settings";
import Karyawan from "../pages/karyawan/Karyawan";

const Routes = () => {
  const { isAuth, level } = useContext(AuthContext);
  console.log("isAuth : ", isAuth);
  console.log("level : ", level);
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        // to={
        //   !level && isAuth === false
        //     ? "/login"
        //     : level && level.toLowerCase() === "operator"
        //     ? "/home"
        //     : "/admin"
        // }
        to={isAuth ? "/home" : "/login"}
      />
      <Routeradmin
        level={level}
        isAuth={isAuth}
        exact
        layout={Mainlayout}
        path="/home"
        component={Home}
      />
      <RouteProtect
        level={level}
        isAuth={isAuth}
        component={Login}
        exact
        path="/login"
      />
      <Routeradmin
        level={level}
        isAuth={isAuth}
        layout={Mainlayout}
        component={Admin}
        exact
        path="/admin"
      />
      <Routeradmin
        level={level}
        isAuth={isAuth}
        layout={Mainlayout}
        component={Settings}
        exact
        path="/settings"
      />

      <Routeradmin
        level={level}
        exact
        layout={Mainlayout}
        path="/karyawan"
        component={Karyawan}
      />
    </Switch>
  );
};

export default Routes;
