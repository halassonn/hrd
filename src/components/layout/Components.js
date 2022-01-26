import styled, { keyframes } from "styled-components";
export const fade = keyframes`
0% { opacity:0 }
30% {  opacity: 0.5 }
40% { opacity: 0.7; }
100% {  opacity: 1; }
`;

export const Headerstyled = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.8);
  height: 32px;
  width: calc(100% - 0px);
  z-index: 1;
  padding: 4px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.text};
  & #sidemenu {
    display: none;
  }

  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0px;
    width: 100%;
    & #sidemenu {
      outline: none;
      display: inherit;
      width: 2em;
      height: 2em;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.8);
        border-radius: 99px;
      }
    }
    /* & h1 {
      font-size: 2rem;
    } */
  }
`;

export const Mainwrapper = styled.div`
  & main {
    top: 45px;
    position: relative;
    overflow: hidden;
    animation-name: ${fade};
    animation-duration: 1s;
    animation-fill-mode: forwards;
    & .page {
      position: fixed;
      top: 35px;
      margin: 0;
      width: calc(100% - ${({ open }) => (open ? 0 : 0)}px);
      height: calc(100% - ${({ open }) => (open ? 0 : 0)}px);
      overflow: auto;
      overflow-x: hidden;
      /* background-color: ${({ theme }) => theme.colors.main}; */
      border-radius: 5px;
    }
  }

  @media (max-width: 700px) {
    & main {
      left: 0px;
      width: 100%;
      & .page {
        position: fixed;
        top: 40px;
        margin: 0;
        width: calc(100% - ${({ open }) => (open ? 0 : 0)}px);
        height: calc(100% - ${({ open }) => (open ? 0 : 40)}px);
        /* padding-bottom: 150px; */
        overflow: auto;
        overflow-x: hidden;
        /* background-color: ${({ theme }) =>
          theme.name === "dark"
            ? theme.colors.primary.light
            : theme.colors.primary.dark}; */
        /* background-color: ${({ theme }) => theme.colors.main}; */
        border-radius: 5px;
      }
    }
  }
`;

export const Mul = styled.ul`
  margin: 16px 0px;
  width: 100%;
  height: calc(100% - 32px);
  overflow-x: hidden;
`;

export const SideMenu = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
`;
