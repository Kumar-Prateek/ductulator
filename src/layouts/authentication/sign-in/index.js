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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import {
  setAllowedRoutes,
  setLocation,
  setMobileNumber,
  setRole,
  setSessionId,
  setUserData,
  setUserId,
  useSoftUIController,
} from "context";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { getOtp, resendOtp, verifyOtp } from "services/loginService";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import Loader from "utility/loader";
import getLocation from "utility/navigator";
import { ShowSwalMsg } from "utility/swal";
import showToast from "utility/toast";
import GetOtp from "./components/getOtp";
import VerifyOtp from "./components/verifyOtp";

function SignUp() {
  const [mobileNo, setMobileNo] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [formState, setFormState] = useState(0);
  const navigate = useNavigate();
  const [controller, dispatch] = useSoftUIController();
  const { sessionId, location, mobileNumber } = controller;

  useEffect(() => {
    if (!location?.latitude && !location?.longitude) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    if (mobileNo && location?.latitude && location?.longitude) {
      getOtp({ mobileNo }).then((resp) => {
        if (successService(resp)) {
          setFormState(1);
          setShowLoader(false);
          showToast("success", resp?.responseMessage);
        } else {
          setShowLoader(false);
          setMobileNo("");
          errorService({ resp });
        }
      });
    }
  }, [mobileNo, location]);

  useEffect(() => {
    if (mobileNumber && sessionId && formState === 2) {
      setTimeout(() => {
        setShowLoader(false);
        navigate("/dashboard");
      }, 100);
    }
  }, [mobileNumber, sessionId, formState]);

  const getUserLocation = () => {
    setShowLoader(true);
    getLocation(handleLocationSuccess, handleLocationError);
  };

  const handleLocationSuccess = (pos) => {
    const crd = pos?.coords;
    setLocation(dispatch, crd);
    setShowLoader(false);
  };

  const handleLocationError = (error) => {
    ShowSwalMsg("error", error.message);
    setLocation(dispatch, { latitude: "_", longitude: "_" });
    setShowLoader(false);
  };

  const handleGetOtp = (val) => {
    setMobileNo(val.mobileNo);
    setShowLoader(true);
  };

  const handleVerifyOtp = (val) => {
    setShowLoader(true);
    verifyOtp({ mobileNo: val.mobileNo, otp: CryptoJS.SHA512(val.otp).toString() }).then((resp) => {
      if (successService(resp)) {
        //
        setMobileNumber(dispatch, val.mobileNo);
        sessionStorage.setItem("mNo", val.mobileNo);
        //
        setSessionId(dispatch, resp?.responseData?.sessionId);
        sessionStorage.setItem("sId", resp?.responseData?.sessionId);
        //
        setUserId(dispatch);
        sessionStorage.setItem("uId", resp?.responseData?.user?._id);
        //
        setUserData(dispatch, resp?.responseData?.user);
        sessionStorage.setItem("uData", JSON.stringify(resp?.responseData?.user));
        //
        setRole(dispatch, resp?.responseData?.user?.role?.toLowerCase());
        sessionStorage.setItem("role", resp?.responseData?.user?.role?.toLowerCase());
        //
        sessionStorage.setItem("pageName", JSON.stringify(resp?.responseData?.pages?.data?.pages));
        setAllowedRoutes(dispatch, resp?.responseData?.pages?.data?.pages);
        //
        setTimeout(() => {
          showToast("success", resp?.responseMessage);
          setFormState(2);
        }, 500);
      } else {
        setShowLoader(false);
        errorService({ resp });
      }
    });
  };

  const handleResendOtp = (val) => {
    resendOtp({ mobileNo: val }).then((resp) => {
      if (successService(resp)) {
        showToast("success", resp?.responseMessage);
      } else {
        errorService({ resp });
      }
    });
  };

  const resetForm = () => {
    setMobileNo("");
  };

  return (
    <BasicLayout title="Sign In" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Welcome
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          {mobileNo?.length !== 10 || formState === 0 ? (
            <GetOtp handleGetOtp={handleGetOtp} />
          ) : (
            <VerifyOtp
              mobileNo={mobileNo}
              handleVerifyOtp={handleVerifyOtp}
              resetForm={resetForm}
              resendOtp={handleResendOtp}
            />
          )}
        </SoftBox>
      </Card>
      {showLoader ? <Loader /> : null}
    </BasicLayout>
  );
}

export default SignUp;
