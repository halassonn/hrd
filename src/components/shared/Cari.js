import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Caristyle = styled.div`
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  width: 200px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    outline: none;
    text-indent: 8px;
    border: none;
    background-color: transparent;
    width:100%;
  }
  & span {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.primary.text};
    }
  }
`;

function Cari(props) {
  const { cleardata, value, onChange, placeholder } = props;
  const [_value, setValue] = useState(value);

  const clearVal = () => {
    cleardata();
    setValue("");
  };

  return (
    <Caristyle {...props}>
      <input
        onChange={onChange}
        value={value || _value}
        placeholder={placeholder}
      />
      {(value && (
        <span onClick={clearVal}>
          <FaTrash />
        </span>
      )) ||
        null}
    </Caristyle>
  );
}

Cari.propTypes = {
  clear: PropTypes.func,
};
Cari.defaultProps = {};

export default Cari;
