/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import App from "App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter basename="/portal">
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
