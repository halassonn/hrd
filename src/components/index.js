import _Loading from "./Loading";
import _Dialog from "./Dialog";
import styled from "styled-components";
import { Link } from "react-router-dom";
import _Inputfile from "./Inputfile";

export const Inputfile = _Inputfile;
export const Loading = _Loading;
export const Dialog = _Dialog;

export const Wpage = styled.div`
  width: 100%;
  height: calc(100% - 10px);
  /* background: ${({ theme }) => theme.colors.main}; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};

  position: sticky;
  top: 16px;
  margin: 0 auto;

  @media (max-width: 700px) {
    top: 0px;
    left: 0px;
    width: calc(100% - 2px);
    height: calc(100% - 4px);
    border: 0px;
    margin: 0px;
  }
`;

export const WPheader = styled.div`
  color: ${({ theme }) => theme.colors.primary.text};
  width: calc(100% - 0px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.primary.main};
  height: 35px;
  & h2 {
    margin-left: 8px;
  }
`;

export const Wbody = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Windowbodystyled = styled(Wbody)`
  & #side1 {
    color: ${({ theme }) => theme.colors.primary.text};
    position: absolute;
    width: 170px;
    top: -1px;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.primary.main};

    @media (max-width: 700px) {
      width: ${({ showmenu }) => (showmenu ? 170 : 0)}px;
      z-index: 15;
    }
  }
  & #side2 {
    background-color: ${({ theme }) => theme.colors.main};
    width: calc(100% - 170px);
    position: absolute;
    height: 100%;
    left: 170px;
    @media (max-width: 700px) {
      left: 0px;
      width: 100%;
    }
  }
`;
export const Mul = styled.ul`
  margin: 0px 0px;
  height: calc(100% - 0px);
  overflow-x: hidden;
  padding-inline-start: 0;
`;

export const Menuitem = styled(Link)`
  color: inherit;
  text-decoration: none;
  height: 60px;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary.light};
    font-weight: bolder;
  }
`;
export const Menuitemicon = styled.span`
  background-color: transparent;
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  & svg {
    font-size: inherit;
  }
`;

export const Menuitemlabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s;
`;

export const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;

  & h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    height: 32px;
    margin-left: 8px;
  }
  & #form {
    /* background-color: ${({ theme }) => theme.colors.primary.dark}; */
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.dark};
    color: ${({ theme }) => theme.colors.primary.main};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    box-shadow: 0.2px 0px 0.2px 0.2px rgba(0, 0, 0, 0.5);
    position: sticky;
    top: -1px;
    z-index: 1;
    & #formaction {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      margin-left: 1px;
      & span {
        margin-right: 8px;
      }
    }
    & #cari {
      margin-right: 10px;
      background-color: ${({ theme }) => theme.colors.primary.text};
    }
  }
  & #formcontent {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: ${({ open }) => (open ? "flex" : "none")};
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    & #formwrap {
      border: 1px solid ${({ theme }) => theme.colors.primary.main};
      background-color: ${({ theme }) => theme.colors.main};
      padding: 0;
      position: relative;
      box-shadow: 0.2px 4px 4px 0.2px rgba(0, 0, 0, 0.5);
      height: 650px;
      width: 100%;
      max-width: 650px;
      overflow: auto;
      & #formheader {
        color: ${({ theme }) => theme.colors.primary.text};
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 32px;
        width: auto;
        z-index: 10;
        & span {
          border-radius: 1px;
        }
        background-color: ${({ theme }) => theme.colors.primary.dark};
      }
      & form {
        & #formbody {
          padding: 16px;
          padding-top: 32px;
          & #kodekantor {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            & #pusat {
              margin-left: 8px;
            }
          }
        }
      }
      & #formaction {
        color: inherit;
        height: 75px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 16px;
      }
    }
    @media (max-width: 700px) {
      padding-bottom: 5rem;
      z-index: 10;
      & #formwrap {
        height: 100%;
        width: 100%;
        max-width: 100%;
        position: fixed;
        top: 40px;
      }
    }
  }
`;
