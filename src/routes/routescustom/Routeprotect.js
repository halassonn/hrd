import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const RouteProtect = (props) => {
  const {
    isAuth,
    level,
    layout: Layout,
    component: Component,
    ...rest
  } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (!isAuth) {
          return <Component {...matchProps} />;
        }

        if (
          (isAuth && level.toLowerCase() === "root") ||
          (isAuth && level.toLowerCase() === "administrator")
        ) {
          return (
            <Redirect
              to={{
                pathname: "/admin",
                state: { from: props.location.pathname },
              }}
            />
          );
        } else if (isAuth && level.toLowerCase() === "operator") {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location.pathname },
              }}
            />
          );
        }
      }}
    />
  );
};

RouteProtect.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteProtect;
