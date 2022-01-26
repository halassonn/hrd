import styled, { keyframes } from "styled-components";
const fade = keyframes`
 0% { opacity:0 }
 30% {  opacity: 0.5 }
 40% { opacity: 0.7; }
 100% {  opacity: 1; }
`;
export const Box = styled.div`
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 5px;
  display: "flex";
  justify-content: center;
  align-items: center;
  min-width: 250px;
  width: 50%;
  padding: 8px;
  animation-name: ${fade};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;
export const Button = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 5px;
  margin-left: 8px;
  color: black;
`;

export const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  /* background-color: rebeccapurple; */
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0px;
  height: 100%;
  width: calc(100% - 0px);
  z-index: 99;
  display: ${({ open }) => (open ? "flex" : "none")};
  animation-name: ${fade};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  @media (max-width: 700px) {
    left: 0px;
  }
`;
