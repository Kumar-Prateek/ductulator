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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React context
import {
  setAllowedRoutes,
  setLayout,
  setMobileNumber,
  setRole,
  setSessionId,
  setUserData,
  setUserId,
  useSoftUIController,
} from "context";
import Loader from "utility/loader";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const navigate = useNavigate();
  const { miniSidenav, sessionId, userId, mobileNo, userData, allowedRoutes, role } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const [dataFetched, setDataFetched] = useState(false);

  const sId = sessionStorage.getItem("sId");
  const uId = sessionStorage.getItem("uId");
  const mNo = sessionStorage.getItem("mNo");
  const uData = sessionStorage.getItem("uData");
  const pName = sessionStorage.getItem("pageName");
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    if (sId && !sessionId) {
      setSessionId(dispatch, sId);
    }
    if (uId && !userId) {
      setUserId(dispatch, uId);
    }
    if (mNo && !mobileNo) {
      setMobileNumber(dispatch, mNo);
    }
    if (pName && process.env.NODE_ENV !== "development") {
      try {
        const parsedName = JSON.parse(pName);
        setAllowedRoutes(dispatch, parsedName);
      } catch (error) {
        console.log("parsing error", error);
      }
    }
    if (uData && !userData?._id) {
      try {
        const parsedData = JSON.parse(uData);
        setUserData(dispatch, parsedData);
      } catch (error) {
        console.log("parsing error", error);
      }
      if (userRole && !role) {
        setRole(dispatch, userRole);
      }
    }
    setTimeout(() => {
      setDataFetched(true);
    }, 500);
  }, []);

  if (!dataFetched) {
    return <Loader />;
  } else if (dataFetched && (!userData?._id || !sessionId || !userId)) {
    navigate("/authentication/sign-in");
  }
  return (
    <SoftBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </SoftBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
