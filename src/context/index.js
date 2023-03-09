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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useMemo, useReducer } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { devDefinedRoutes, prodDefinedRoutes } from "./data";

// The Soft UI Dashboard PRO Material main context
const SoftUI = createContext(null);

// Setting custom name for the context which is visible on react dev tools
SoftUI.displayName = "AdminPanelContext";

// Soft UI Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "ALLOWED_ROUTES": {
      return { ...state, allowedRoutes: action.value };
    }
    case "SET_ROLE": {
      return { ...state, role: action.value };
    }
    case "SET_SESSION_ID": {
      return { ...state, sessionId: action.value };
    }
    case "SET_USER_ID": {
      return { ...state, userId: action.value };
    }
    case "SET_MOBILE_NUMBER": {
      return { ...state, mobileNumber: action.value };
    }
    case "SET_USER_DATA": {
      return { ...state, userData: action.value };
    }
    case "SET_LOCATION": {
      return { ...state, location: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Soft UI Dashboard React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    allRouteKeys: [
      "dashboard",
      "tables",
      "billing",
      "virtual-reality",
      "account-pages",
      "profile",
      "sign-in",
      "sign-up",
      "provider-integration",
      "template-setting",
      "delivery-status",
      "test-sms",
      "tenant-integration",
      "webhook",
      "configuration",
      "plans",
    ],
    allRoutes: [
      { pageName: "dashboard", allowed: true, pageName: "Dashboard" },
      { pageName: "sign-in", allowed: true, pageName: "Sign In" },
      { pageName: "provider-integration", allowed: true, pageName: "Provider Integration" },
      { pageName: "template-setting", allowed: true, pageName: "Template Setting" },
      { pageName: "delivery-status", allowed: true, pageName: "Delivery Status" },
      { pageName: "test-sms", allowed: true, pageName: "Test SMS" },
      { pageName: "tenant-integration", allowed: true, pageName: "Tenant Integration" },
      { pageName: "webhook", allowed: true, pageName: "Webhook" },
      { pageName: "configuration", allowed: true, pageName: "Configuration" },
      { pageName: "plans", allowed: true, pageName: "Plans" },
      { pageName: "role", allowed: true, pageName: "Role" },
    ],
    allowedRoutes: process.env.NODE_ENV === "development" ? devDefinedRoutes : prodDefinedRoutes,
    role: "",
    sessionId: "",
    userId: "",
    mobileNumber: "",
    userData: {
      _id: "",
      activeStatus: false,
      createdOn: "",
      updatedOn: "",
      fullName: "",
      mobileNo: null,
      emailId: "",
      companyName: "",
      __v: 0,
    },
    location: { latitude: "", longitude: "" },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <SoftUI.Provider value={value}>{children}</SoftUI.Provider>;
}

// Soft UI Dashboard React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setAllowedRoutes = (dispatch, value) => dispatch({ type: "ALLOWED_ROUTES", value });
const setRole = (dispatch, value) => dispatch({ type: "SET_ROLE", value });
const setSessionId = (dispatch, value) => dispatch({ type: "SET_SESSION_ID", value });
const setUserId = (dispatch, value) => dispatch({ type: "SET_USER_ID", value });
const setMobileNumber = (dispatch, value) => dispatch({ type: "SET_MOBILE_NUMBER", value });
const setUserData = (dispatch, value) => dispatch({ type: "SET_USER_DATA", value });
const setLocation = (dispatch, value) => dispatch({ type: "SET_LOCATION", value });

export {
  SoftUIControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setAllowedRoutes,
  setRole,
  setSessionId,
  setUserId,
  setMobileNumber,
  setUserData,
  setLocation,
};
