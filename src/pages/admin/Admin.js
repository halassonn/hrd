import React, { useState, useContext, useEffect } from "react";
import { FaFrog, FaStarOfLife } from "react-icons/fa";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  Mul,
  Windowbodystyled,
  Wpage,
  WPheader,
  Menuitem,
  Menuitemlabel,
  Menuitemicon,
} from "../../components";
import { v4 as uuid } from "uuid";
import { AiOutlineSetting } from "react-icons/ai";
import { Box, Button } from "../../components/shared";
import { GlobalContext, ParameterContext } from "../../context";
import { MdEngineering, MdPeople } from "react-icons/md";

const BtnMenu = styled.button`
  border: gray 1px solid;
  color: black;
  min-height: 150px;
  min-width: 150px;
  font-size: 5rem;
  border-radius: 5%;
  margin: 5px;
  display: flex;
  align-items: center;
`;

function Admin(props) {
  const { history } = props;
  const { response, setResponse, closeResponse, loading } =
    useContext(GlobalContext);
  const { parameters, getParameters } = useContext(ParameterContext);
  const openPage = (page) => {
    history.push(page);
  };

  useEffect(() => {
    console.log(response.show);
  }, [response]);

  useEffect(() => {
    let a = true;
    if (a) {
      getParameters();
    }

    return () => {
      a = false;
    };
  }, []);

  return (
    <div className="page">
      <Wpage
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BtnMenu
          onClick={() => {
            openPage("/settings");
          }}
       
        >
          <MdEngineering />
          <>SETTINGS</>
        </BtnMenu>
        <BtnMenu
          onClick={(e) => {
            openPage("/karyawan");
          }}
        >
          <MdPeople />
          <>DATA KARYAWAN</>
        </BtnMenu>
      </Wpage>
    </div>
  );
}

export default withRouter(Admin);
