import React from "react";
import { ReactComponent as Spinner } from "./image/spinner2.svg";

const _Loading = (props) => {
  const { children } = props;
  return (
    <div>
      {children ? (
        children
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  );
};

export default _Loading;
