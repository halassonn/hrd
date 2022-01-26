import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Routeradmin = (props) => {
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
        if (isAuth === false) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          );
        } else {
          if (
            (level && level.toLowerCase() === "root") ||
            (level && level.toLowerCase() === "administrator") ||
            (level && level.toLowerCase() === "operator")
          ) {
            return (
              <Layout>
                <Component {...matchProps} />
              </Layout>
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/cannot-access",
                  state: { from: props.location.pathname },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

Routeradmin.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default Routeradmin;
