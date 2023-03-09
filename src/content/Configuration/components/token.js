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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useState } from "react";

function Token({ token, noGutter, handleGetToken }) {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Token
        </SoftTypography>
      </SoftBox>
      <SoftBox my={2}>
        <SoftBox
          component="li"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          bgColor="grey-100"
          borderRadius="lg"
          p={3}
          mb={noGutter ? 0 : 1}
          mt={2}
        >
          <SoftBox width="100%" display="flex" flexDirection="column">
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              mb={2}
            >
              {!token ? (
                <SoftTypography variant="caption" fontWeight="light">
                  Generate a new token
                </SoftTypography>
              ) : (
                <SoftBox
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <SoftTypography
                    className={hidden ? "MuiTypography-aphitc3" : ""}
                    variant="button"
                    fontWeight="medium"
                    mt={1}
                  >
                    {token}
                  </SoftTypography>
                  <SoftButton color="light" variant="gradient" onClick={() => setHidden(!hidden)}>
                    <Icon>{!hidden ? "visibility" : "visibility_off"}</Icon>
                  </SoftButton>
                </SoftBox>
              )}
            </SoftBox>
          </SoftBox>
        </SoftBox>
        {!token ? (
          <SoftBox my={2}>
            <SoftButton variant="gradient" color="info" onClick={() => handleGetToken()}>
              Generate Token
            </SoftButton>
          </SoftBox>
        ) : null}
      </SoftBox>
    </>
  );
}

// Setting default values for the props of Bill
Token.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Token.propTypes = {
  token: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  handleGetToken: PropTypes.func,
};

export default Token;
