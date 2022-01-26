import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Section } from "../../../components";
import { useTheme } from "../../../theme/useTheme";
import { AuthContext, GlobalContext, UserContext } from "../../../context";
import validate from "validate.js";
import { Button } from "../../../components/shared";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Div = styled.div`
  margin: 50px;
  width: 250px;
  display: flex;
  flex-direction: column;

  & #error {
    top: -10px;
    color: red;
    position: relative;
    font-size: 10px;
  }
  & #ket {
    font-weight: 200;
    font-style: italic;
    position: relative;
    font-size: 10px;
  }
  & #title_field {
    position: relative;
    /* top: 10px; */
    font-weight: 800;
  }
`;
const Inputpass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  background-color: white;
  border: 1px solid black;
  margin-bottom: 8px;
  & input {
    width: 90%;
    border: none;
    outline: none !important;
  }

  & svg {
    font-size: 15px;
    cursor: pointer;
    margin-right: 5px;
  }
`;

function Gantipassword(props) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { titlepage, openform } = props;
  const { username, changePassword, logout } = useContext(AuthContext);
  const { getUsers } = useContext(UserContext);
  const [typeinput, setTypeInput] = useState(true);
  const [typeinputc, setTypeInputc] = useState(true);
  const {
    setResponse,
    closeResponse,
    response,
    file_upload,
    dispatch,
    uploadPdf,
  } = useContext(GlobalContext);

  const txtpassword = useRef();
  const txtpasswordc = useRef();
  const btnbatal = useRef();
  const btnsubmit = useRef();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      password: "",
      konfirmasi_password: "",
    },
    touched: {},
    errors: {},
    globerror: null,
  });

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
    getUsers();
    // setFormState((f) => ({
    //   isValid: false,
    //   values: {
    //     password: "",
    //     konfirmasi_password: "",
    //   },
    //   touched: {},
    //   errors: {},
    //   globerror: null,
    // }));
  };

  const onSaveToDB = () => {
    closeResponse();
    const databody = {
      password: formState.values.password,
    };
    changePassword(username, databody);
  };
  const onSubmit = () => {
    if (validatedata()) {
      setResponse({
        show: true,
        message: `Benar Data ingin di ${
          formState.values._id ? `Update` : `Simpan`
        }?`,
        action: null,
        children: (
          <div>
            <Button onClick={closeResponse}>Tidak</Button>
            <Button onClick={onSaveToDB}>Ya</Button>
          </div>
        ),
      });
    }
  };

  const validatedata = () => {
    const err =
      isUpper(formState.values.password, schema) ||
      isUpper(formState.values.konfirmasi_password, schema);

    if (err) {
      setFormState((e) => ({
        ...e,
        globerror: err,
      }));

      return false;
    } else {
      setFormState((e) => ({
        ...e,
        globerror: err,
      }));
      return true;
    }
  };

  useEffect(() => {
    let a = true;
    if (a) {
      const validateform = () => {
        const errors =
          validate(formState.values, schema) ||
          formState.values.password !== formState.values.konfirmasi_password
            ? { konfirmasi_password: ["Password Not Match"] }
            : null;

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
    <Section open={open}>
      <h1>{titlepage || ""}</h1>

      <Div>
        <label id="title_field">Password Baru :</label>
        <Inputpass>
          <input
            name="password"
            value={formState.values.password || ""}
            onChange={onchange}
            ref={txtpassword}
            type={typeinput ? "password" : "text"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtpasswordc.current.focus();
              }
            }}
          />{" "}
          <span
            onClick={() => {
              setTypeInput(!typeinput);
            }}
          >
            {!typeinput ? <FaEye /> : <FaEyeSlash />}
          </span>
        </Inputpass>

        <label id="error">
          {HasError("password", formState) ? formState.errors.password : ""}
        </label>
        <label id="title_field">Konfirmasi Password :</label>
        <Inputpass>
          <input
            
            name="konfirmasi_password"
            value={formState.values.konfirmasi_password || ""}
            onChange={onchange}
            ref={txtpassword}
            type={typeinputc ? "password" : "text"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtpasswordc.current.focus();
              }
            }}
          />
          <span
            onClick={() => {
              setTypeInputc(!typeinputc);
            }}
          >
            {!typeinputc ? <FaEye /> : <FaEyeSlash />}
          </span>
        </Inputpass>
        <label id="error">
          {HasError("konfirmasi_password", formState)
            ? formState.errors.konfirmasi_password
            : formState.touched.konfirmasi_password && formState.match === false
            ? formState.errors.konfirmasi_password
            : ""}
        </label>

        <p style={{ fontStyle: "italic", color: "red" }}>
          {formState.globerror || ""}
        </p>
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
            Change
          </Button>
        </div>
      </Div>
    </Section>
  );
}

export default Gantipassword;

const schema = {
  password: {
    presence: { message: "is required" },
    length: { minimum: 8, message: `Minimal 8 Karakter` },
    // format: {
    //   pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*W)",
    //   message: "Harus Ada Huruf Besar",
    // },
  },
  konfirmasi_password: {
    presence: {
      // allowEmpty: false,
      message: "is required",
    },
    length: { minimum: 8, message: `Minimal 8 Karakter` },
  },
};

function isUpper(str, field) {
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );
  let message = null;
  let error = null;

  // if (str !== "")
  if (pattern.test(str) === false) {
    message = `password harus terdiri dari huruf kecil, minimal 1 huruf Besar, minimal 1 angka, dan minimal 1 karakter unik`;
    // const x = Object.keys(d);
    // const xc = x.map((e, i) => {
    //   return JSON.stringify(`{${e}:[${message}]}`);
    // });

    // error = xc[x[0]];
  }

  // if (!/[a-z]/.test(str) && /[A-Z]/.test(str)) {
  //   message = "Harus Ada Hurum Besar";
  // }

  // const x = Object.keys(d);
  // const xc = x.map((e, i) => {
  //   return JSON.stringify(`{${e}:[${message}]}`);
  // });
  // console.log(!/[a-z]/.test(str) && /[A-Z]/.test(str));
  // return xc;

  return message;
}
