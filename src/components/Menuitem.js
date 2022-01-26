import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../context";

const Menu = styled(Link)`
  color: inherit;
  text-decoration: none;
  height: 40px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  padding-right: 0px;
  font-size: 24px;


  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    font-weight: bolder;
    border-left: 4px solid ${({ theme }) => theme.colors.primary.light};
 
  }
  & .menuicon {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;

  }
  & .submenu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

  }
`;
const Submenu = styled(Link)`
  color: inherit;
  text-decoration: none;
  height: 40px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  position: relative;
  /* width: 200px; */
  &:hover {
    cursor: pointer;
    font-weight: bolder;
    border-left: 4px solid ${({ theme }) => theme.colors.primary.light};
    width:250px;
  }
  & .menusubicon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${({ open }) => (open ? 24 : 16)}px;
  }
`;
const Menulabel = styled.span`
  margin-left: 16px;
  font-size: 16px;
`;
const Menusublabel = styled.span`
  margin-left: 16px;
  font-size: 14px;
`;

function Menuitem({ item, open }) {
  const [subnav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subnav);
  const { setApp } = useContext(GlobalContext);
  return (
    <>
      <Menu
        open={open}
        to={item.path}
        onClick={() => {
          item.subNav && showSubNav();
          setApp({ name: item.title, page: item.path });
        }}
      >
        <div className="menuicon">
          {item.icon}
          {open ? <Menulabel>{item.title}</Menulabel> : null}
        </div>
        <div className="submenu">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Menu>
      {subnav &&
        item.subNav.map((item, index) => (
          <Submenu
            key={index}
            open={open}
            to={item.path}
            onClick={() => {
              setApp({ name: item.title, page: item.title });
            }}
          >
            <div className="menusubicon">
              {item.icon}
              {open ? <Menusublabel>{item.title}</Menusublabel> : null}
            </div>
          </Submenu>
        ))}
    </>
  );
}

export default Menuitem;
