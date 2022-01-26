import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Routeall = (props) => {
  const {
    isAuth,
    level,
    layout: Layout,
    component: Component,
    render: Render,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        // return (
        //   <Layout>
        //     <Component {...matchProps} />
        //   </Layout>
        // );
        if (isAuth===true) {
          return (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          );
        }
      }}
    />
  );
};

Routeall.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default Routeall;
