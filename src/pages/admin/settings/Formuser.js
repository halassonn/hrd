import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../../components/shared";
import validate from "validate.js";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  & input,
  select,
  textarea {
    margin: 9px 0px;
  }

  & #error {
    top: -10px;
    color: red;
    position: relative;
    font-size: 10px;
  }
  & #title_field {
    position: relative;
    top: 10px;
    font-weight: 800;
  }
  & #rowtitle {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 4px;
    & label {
      width: 150px;
    }
  }
`;

function Formuser() {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: null,
      nik: "",
      nama: "",
      username: "",
      password: "",
      konfirmasi_password: "",
      level_user: null,
    },
    touched: {},
    errors: {},
  });
  const txtnik = useRef();
  const txtnama = useRef();
  const txtusername = useRef();
  const txtpassword = useRef();
  const txtpasswordc = useRef();
  const txtlevel = useRef();

  const btnsubmit = useRef();
  const btnbatal = useRef();

  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

  const onchange = (e) => {
    const field = e.target.name;
    const val = e.target.value;

    e.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [field]: val,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };

  const onBatal = () => {
    console.log(formState);
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: null,
        nik: "",
        nama: "",
        username: "",
        password: "",
        konfirmasi_password: "",
        level_user: null,
      },
      touched: {},
      errors: {},
    }));
  };
  const onSubmit = () => {};

  useEffect(() => {
    let a = true;
    if (a) {
      const validateform = () => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
      };
      validateform();
    }
    return () => (a = false);
    // eslint-disable-next-line
  }, [formState.values]);

  return (
    <Div>
      <label id="title_field">Nama :</label>
      <input
        name="nama"
        value={formState.values.nama || ""}
        onChange={onchange}
        ref={txtnama}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtusername.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("nama", formState) ? formState.errors.nama : ""}
      </label>

      <label id="title_field">Username :</label>
      <input
        name="username"
        value={formState.values.username || ""}
        onChange={onchange}
        ref={txtusername}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtpassword.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("username", formState) ? formState.errors.username : ""}
      </label>

      <label id="title_field">Password :</label>
      <input
        type="password"
        name="password"
        value={formState.values.password || ""}
        onChange={onchange}
        ref={txtpassword}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtpasswordc.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("password", formState) ? formState.errors.password : ""}
      </label>

      <label id="title_field">Konfirmasi Password :</label>
      <input
        type="password"
        name="konfirmasi_password"
        value={formState.values.konfirmasi_password || ""}
        onChange={onchange}
        ref={txtpasswordc}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtlevel.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("konfirmasi_password", formState) ? formState.errors.konfirmasi_password : ""}
      </label>

      <label id="title_field">Level :</label>
      <select
        onChange={onchange}
        ref={txtlevel}
        value={formState.values.level_user || ""}
        name="level_user"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnsubmit.current.focus();
          }
        }}
      >
        <option value=""></option>
        <option value="Administrator">Administrator</option>
        <option value="Operator">Operator</option>
      </select>
      <label id="error">
        {" "}
        {HasError("level_user", formState) ? formState.errors.level_user : ""}
      </label>

      <p />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <Button ref={btnbatal} onClick={onBatal}>
          Batal
        </Button>
        <Button
          ref={btnsubmit}
          onClick={onSubmit}
          disabled={formState.isValid ? false : true}
        >
          Simpan
        </Button>
      </div>
    </Div>
  );
}

export default Formuser;

const schema = {
  //   nik: {
  //     format: {
  //       pattern: "[0-9]+",
  //       message: "is required and can only contain 0-9",
  //     },
  //   },
  nama: {
    presence: { allowEmpty: false, message: "is required" },
  },
  username: {
    presence: { allowEmpty: false, message: "is required" },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
  },
  konfirmasi_password: {
    presence: { allowEmpty: false, message: "is required" },
  },
  level_user: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
