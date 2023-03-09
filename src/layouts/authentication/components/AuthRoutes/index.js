import {
  setAllowedRoutes,
  setMobileNumber,
  setRole,
  setSessionId,
  setUserData,
  setUserId,
  useSoftUIController,
} from "context";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loader from "utility/loader";

export default function AuthRoutes({ children }) {
  const sId = sessionStorage.getItem("sId");
  const uId = sessionStorage.getItem("uId");
  const mNo = sessionStorage.getItem("mNo");
  const uData = sessionStorage.getItem("uData");
  const pName = sessionStorage.getItem("pageName");
  const userRole = sessionStorage.getItem("role");

  const [dataFetched, setDataFetched] = useState(false);
  const [authenticated, setAuthenticated] = useState("");

  const [controller, dispatch] = useSoftUIController();
  const { sessionId, userId, mobileNo, userData, allowedRoutes, role } = controller;

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
    if (pName && process.env.NODE_ENV === "development") {
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
    }
    if (userRole && !role) {
      setRole(dispatch, userRole);
    }
    setDataFetched(true);
  }, []);

  useEffect(() => {
    if (sessionId && userId && mobileNo && userData && role) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [dataFetched]);

  if (authenticated === "") return <Loader />;
  else if (authenticated === false) return null;
  else return <>{children}</>;
}

AuthRoutes.propTypes = {
  children: PropTypes.element,
};
