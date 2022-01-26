import React, { useContext, useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/useTheme";
import { AuthContext, GlobalContext } from "../../context";
import Input from "../../components/shared/Input";
import { Box, Button } from "../../components/shared";
import validate from "validate.js";
import { Dialog, Loading } from "../../components";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Loginpage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const Inputpass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  background-color: white;
  border: 0.8px solid black;
  margin-bottom: 8px;
  & input {
    width: 90%;
    border: none;
    outline: none !important;
    text-indent: 8px;
  }

  & svg {
    font-size: 15px;
    cursor: pointer;
    margin-right: 5px;
  }
`;

const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const HasError = (field, state) =>
  state.touched[field] && state.errors[field] ? true : false;

export default function Login() {
  const { theme } = useTheme();
  const { login } = useContext(AuthContext);
  const { loading, response, closeResponse } = useContext(GlobalContext);
  const txtemail = useRef();
  const txtpassword = useRef();
  const btnSubmit = useRef();
  const [showpass, setShowPass] = useState(true);

  const [state, setstate] = useState({
    isValid: false,
    values: {
      username: "",
      password: "",
    },
    touched: {},
    errors: {},
  });

  const onChange = (e) => {
    e.persist();
    setstate((s) => ({
      ...s,
      values: {
        ...s.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...state.touched,
        [e.target.name]: true,
      },
    }));
  };
  useEffect(() => {
    txtemail.current.focus();
  }, []);

  useEffect(() => {
    const errors = validate(state.values, schema);
    setstate((state) => ({
      ...state,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [state.values]);

  const doLogin = () => {
    const data = {
      username: state.values.username,
      password: state.values.password,
    };
    login(data);
  };

  return (
    <Loginpage>
      <Box style={{ width: "250px" }}>
        <h1>HRD SYSTEM LOGIN</h1>

        <Input
          ref={txtemail}
          name="username"
          title="Username"
          type="text"
          rowtype="column"
          onChange={onChange}
          error={HasError("username", state) ? state.errors.username : ""}
          onKeyPress={(e) => {
            if (e.key === "Enter") txtpassword.current.focus();
          }}
        />

        {/* <Input
          ref={txtpassword}
          name="password"
          title="Password"
          type="password"
          onChange={onChange}
          error={HasError("password", state) ? state.errors.password : ""}
          onKeyPress={(e) => {
            if (e.key === "Enter") btnSubmit.current.focus();
          }}
        /> */}

        <label id="title_field">Password :</label>
        <Inputpass>
          <input
            name="password"
            title="Password"
            placeholder="Password"
            value={state.values.password || ""}
            onChange={onChange}
            ref={txtpassword}
            type={showpass ? "password" : "text"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                btnSubmit.current.focus();
              }
            }}
          />
          <span
            onClick={() => {
              setShowPass(!showpass);
            }}
          >
            {!showpass ? <FaEye /> : <FaEyeSlash />}
          </span>
        </Inputpass>
        <label id="error">
          {HasError("password", state) ? state.errors.password : ""}
        </label>

        {loading && <Loading style={{ fontSize: "12px" }} />}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0px",
          }}
        >
          <Button>Batal</Button>
          <Button
            ref={btnSubmit}
            disabled={state.isValid ? false : true}
            onKeyPress={doLogin}
            onClick={doLogin}
          >
            Login
          </Button>
        </div>

        {response.show ? (
          <Dialog
            open={response.show}
            onClose={closeResponse}
            status={response.status}
            message={response.message}
            action={response.action}
          >
            {/* <h1>{response.message}</h1> */}
          </Dialog>
        ) : null}
        <p />
        <p />
        <p />
        <p
          style={{
            fontSize: "8px",
            marginBlockStart: "0",
            marginBlockEnd: "0",
            fontStyle: "italic",
          }}
        >
          HRD System Application
        </p>
        <p
          style={{
            fontSize: "8px",
            marginBlockStart: "0",
            marginBlockEnd: "0",
            fontStyle: "italic",
          }}
        >
          version : 1.0
        </p>
        <p
          style={{
            fontSize: "8px",
            marginBlockStart: "0",
            marginBlockEnd: "0",
            fontStyle: "italic",
          }}
        >
          Created by : Halasson Gultom
        </p>
      </Box>
    </Loginpage>
  );
}
