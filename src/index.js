import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import * as themes from "./theme/schema.json";
import { setToLS } from "./utils";

const rootElement = document.getElementById("root");

const Index = () => {
  setToLS("all-themes", themes.default);
  return <App />;
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
