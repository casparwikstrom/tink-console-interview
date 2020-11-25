import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
      <App className={"body-background"}/>
    </BrowserRouter>,
    document.getElementById("root")
);

