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

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// @mui icons

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/UserConfigurator/ConfiguratorRoot";

// Soft UI Dashboard React context
import SoftButton from "components/SoftButton";
// @mui material components
import {
  setMobileNumber,
  setOpenConfigurator,
  setSessionId,
  setUserId,
  useSoftUIController,
} from "context";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "services/loginService";
import { successService } from "services/respService/successService";
import { ShowSwalWithResult } from "utility/swal";
import showToast from "utility/toast";

const displayData = [
  { key: "fullName", label: "User Name" },
  { key: "mobileNo", label: "Mobile No" },
  { key: "emailId", label: "Email Id" },
  { key: "companyName", label: "Company Name" },
];

function UserConfigurator() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, userData, location, sessionId, userId, mobileNumber } = controller;
  const navigate = useNavigate();

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  const handleLogout = () => {
    ShowSwalWithResult("question", "Do you wish to logout?").then((result) => {
      if (result.isConfirmed) {
        logout(
          { mobileNo: mobileNumber },
          { lat: location.latitude, long: location.longitude, sessionId, userId }
        ).then((resp) => {
          if (successService(resp)) {
            showToast("success", resp.responseMessage);
            sessionStorage.clear();
            setSessionId(dispatch, "");
            setUserId(dispatch, "");
            setMobileNumber(dispatch, "");
            handleCloseConfigurator();
            navigate("/");
          } else {
            sessionStorage.clear();
            setSessionId(dispatch, "");
            setUserId(dispatch, "");
            setMobileNumber(dispatch, "");
            handleCloseConfigurator();
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={1}
      >
        <SoftBox>
          <SoftTypography variant="h5">Settings</SoftTypography>
        </SoftBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SoftBox>

      <Divider />
      <SoftBox
        pt={1.25}
        pb={3}
        px={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <SoftBox my={2} display="flex" flexDirection="column">
          {displayData?.map((item) => (
            <React.Fragment key={item.key}>
              {userData[item.key] ? (
                <SoftBox my={1} display="flex" flexDirection="column">
                  <SoftTypography variant="caption">{item.label}:</SoftTypography>
                  <SoftTypography ml={2} variant="button">
                    {userData[item.key]}
                  </SoftTypography>
                </SoftBox>
              ) : null}
            </React.Fragment>
          ))}
        </SoftBox>

        <Divider />
        <SoftBox pt={1.25} pb={3} display="flex" flexDirection="row" justifyContent="space-around">
          <SoftBox my={2} display="flex" flexDirection="column">
            <SoftButton
              variant="gradient"
              color="secondary"
              fullWidth
              sx={{
                ...sidenavTypeButtonsStyles,
              }}
              onClick={() => handleLogout()}
            >
              <Icon>logout</Icon> Logout
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </ConfiguratorRoot>
  );
}

export default UserConfigurator;
