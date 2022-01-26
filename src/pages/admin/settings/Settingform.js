import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import {
  FaAngleDown,
  FaAngleUp,
  FaClosedCaptioning,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";

// import { GlobalContext, KaryawanContext } from "../../context";

const Subpage = styled.div`
  position: absolute;
  top: 10px;
  background-color: white;
  margin: 8px;
  width: calc(40% - 80px);
  /* height: ${({ height }) => (height ? height : "450px")}; */
  min-height: 450px;
  min-width: 250px;
  height: calc(100% - 90px);
  box-shadow: 0.2px 4px 4px 0.2px rgba(0, 0, 0, 0.5);
  overflow: overlay;
  /* padding: 25px 25px 40px 25px; */
`;
const Contentpage = styled.div`
  padding: 25px 25px 40px 25px;
  & h3 {
    cursor: pointer;
    padding: 5px;
    padding-left: 0px;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
  }
`;
const Actionpage = styled.div`
  display: flex;
  padding: 5px;
  justify-content: flex-end;
`;
function Settingform(props) {
  return (
    <Subpage>
      <div
        style={{
          position: "sticky",
          top: "-2px",
          fontSize: "18px",
          cursor: "pointer",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
          padding: "0px 25px 0px 25px",
        }}
      >
        <h3>
          <FaUser style={{ marginRight: "8px" }} />
          {props.titlepage}
        </h3>
        <FaWindowClose
          onClick={() => {
            props.onCloseDialog();
          }}
        />
      </div>

      <Contentpage>{props.el}</Contentpage>
      <Actionpage></Actionpage>
    </Subpage>
  );
}

export default Settingform;
