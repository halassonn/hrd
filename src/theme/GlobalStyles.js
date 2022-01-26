import { createGlobalStyle } from "styled-components";
import back from "../components/image/backg.jpg";

export const GlobalStyles = createGlobalStyle`

  body {
    /* background: ${({ theme }) => theme.colors.primary.light}; */
    background-image: url(${back});
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    /* transition: all 0.50s linear; */
    font-size: 12px;
  }
  input, select{
    height: 25px;
  }
  .dialog{
    z-index: 99;
    background: rgba(225,225,225,0.2);
    position: fixed;
    top: 40px;
    right: 0px;
    left:0px;
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  .avatar{
    position: relative;
    align-items: center;
    align-content: center;
    border:0.1px black solid;
    width: 130px;
    height: 150px;
   /* background-color: red; */
    /* & label, img{
      width: 120px !important;
      height: 160px;
    }
    & label{

    } */
  }
  .avatar_btn {
    position: absolute;
    top:0;
    /* background-color: gray; */
    width: 130px;
    height: 150px;
    border:none;
    label{
      align-items: center;
      color:transparent
    }

  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
  }

  h1{
    font-size:18px;
  }
  h2{
    font-size:15px;
  }



  button {
    outline:none;
    border: 0;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.primary.text};
    &:disabled{
      color:gray;
    }
    &:enabled{
      &:hover{
      cursor:pointer;

    }
    }
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.text};
  }
  .error {
    color:red !important;
  }

input::placeholder{
  color: ${({ theme }) => theme.colors.text};
}



 
  ::-webkit-scrollbar {
  width: 8px;
  height:8px;
  border: 5px solid white;}

   ::-webkit-scrollbar-thumb {
    background-color:  ${({ theme }) => theme.colors.primary.dark};
    background-clip: padding-box;
    border: 0.05em solid #eeeeee;
    border-radius:2px;
  } 

  ::-webkit-scrollbar-track {

    background-color: #bbbbbb;
  }
  ::-webkit-scrollbar-thumb:hover{
    background-color:${({ theme }) => theme.colors.primary.dark};
  }

  /* Buttons */
  ::-webkit-scrollbar-button:single-button {
    
    display: block;
    border-style: solid;
    height: 8px;
    width: 8px;
  }
  /* Up */

  ::-webkit-scrollbar-button:single-button:vertical:decrement {
    border-width: 0 4px 4px 4px;
    border-color: transparent transparent #555555 transparent;
  }
  
  ::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    border-color: transparent transparent #777777 transparent;
  }
  /* Down */
  ::-webkit-scrollbar-button:single-button:vertical:increment {
    border-width: 4px 4px 0 4px;
    border-color: #555555 transparent transparent transparent;
  }

  ::-webkit-scrollbar-button:single-button::vertical:increment:hover {
    border-color: #777777 transparent transparent transparent;
  }



`;
