import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./scss/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
