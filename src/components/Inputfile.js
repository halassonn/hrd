import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";

const Inputfilestyled = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
  color: rgb(43, 42, 42);
  width: 100%;
  height: 32px;
  & :hover {
    background-color: rgba(92, 91, 91, 0.712);
    cursor: pointer;
  }
  & input[type="file"] {
    display: none;
    left: 0;
    top: 0;
    position: relative;
    height: 100%;
    width: 100%;
    color: red;
  }
  & label {
    font-size: 12px;
    height: 100%;
    width: 100%;
    min-width: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    padding-left: 8px;
  }
  & .clear {
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    font-weight: bold;
    margin-right: 8px;
    &:hover {
      border-radius: 99px;
    }
  }
`;

const _Inputfile = (props, ref) => {
  const {
    title,
    onChange,
    value,
    error,
    rowtype,
    type,
    children,
    clear,
    style,
    width,
    money,
  } = props;
  const [focus, setFocus] = useState(false);
  const [locked, setLocked] = useState(false);
  const [_value, setValue] = useState(value || "");
  const [file, setFile] = useState(null);
  const funcOnChange = (e) => {
    e.persist();
    if (onChange) {
      onChange(e);
      setValue((v) => e.target.value);
      if (type === "file") {
        setFile(e.target.files);
      }
    } else {
      setValue((v) => value);
      // setValue((v) => e.target.value);
    }
  };
  const clearFile = () => {
    if (clear) {
      clear();
      setFile("");
      setValue("");
    }
  };

  return (
    <Inputfilestyled {...props}>
      <label>
        <input
          {...props}
          type="file"
          onClick={(e) => {
            e.target.value = "";
          }}
          value={value}
          onChange={funcOnChange}
        />
        {(file && file[0] && file[0].name) || "Choose file"}
        {/* {children} */}
      </label>
      {/* {file && (
        <span className="clear" onClick={clearFile}>
          X
        </span>
      )} */}
    </Inputfilestyled>
  );
};

export default _Inputfile;
