import React, { useState, useEffect, forwardRef } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import styled from "styled-components";

const _InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ rowtype }) => (rowtype === "row" ? "row" : "column")};
  justify-content: flex-start;
  align-items: flex-start;
  width: ${({ width }) => width};
  height: 35px;
  margin-bottom: ${({ error }) => (error ? "2rem" : "1.5rem")};
  & #title {
    top: ${({ rowtype, focus, locked, error }) =>
      rowtype === "row"
        ? "default"
        : focus || locked || error
        ? "-14px"
        : "14px"};
    left: 0px;
    font-size: 12px;
    font-weight: bolder;
    display: ${({ rowtype }) => (rowtype === "row" ? "flex" : "default")};
    align-items: ${({ rowtype }) =>
      rowtype === "row" ? "flex-end" : "default"};
    justify-content: ${({ rowtype }) =>
      rowtype === "row" ? "flex-end" : "flex-start"};
    padding-right: ${({ rowtype }) => (rowtype === "row" ? "15px" : "0")};
    height: 100%;
  }
  & input {
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.colors.input.background};
    color: ${({ theme }) => theme.colors.input.text};
    width: 100%;
    height: 100%;
    min-height: 32px;
    position: relative;
    border: ${({ error }) => (error ? "1px solid #f15633" : "0.5px solid")};
    border-radius: 1.5px;
    outline: none;
    padding: 0;
    transition: 0.1s all ease-in-out;
    -webkit-appearance: none;
    text-indent: 8px;
    &:hover {
      /* box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.8); */
    }
    &::-webkit-input-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
    }
    &::-moz-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
    }
    &::-ms-input-placeholder {
      color: ${({ focus, error }) =>
        focus || error ? "transparent" : "inherit"};
    }
  }
`;

const Input = forwardRef((props, ref) => {
  const {
    name,
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

  return (
    <_InputContainer
      error={error}
      style={style}
      rowtype={rowtype}
      focus={focus}
      locked={locked}
    >
      <label id="title">{title}</label>
      <input
         {...props}
        title={title}
        placeholder={title}
        name={name}
        onChange={onChange}
        onFocus={() => !locked && setFocus(true)}
        onBlur={() => !locked && setFocus(false)}
        value={value}
        type={type}
        ref={ref}
      />
      <label>{error}</label>
    </_InputContainer>
  );
});
Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  onKeyPress: PropTypes.func,
  type: PropTypes.string,
  money: PropTypes.string,
  clear: PropTypes.func,
};
Input.defaultProps = {
  money: "false",
  title: "",
  error: null,
  type: "text",
};
export default Input;
