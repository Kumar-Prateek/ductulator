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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import {
  setAllowedRoutes,
  setMobileNumber,
  setRole,
  setSessionId,
  setUserData,
  setUserId,
  useSoftUIController,
} from "context";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "utility/loader";

// Authentication layout components

function BasicLayout({ title, description, image, children }) {
  const [dataFetched, setDataFetched] = useState(false);

  const [controller, dispatch] = useSoftUIController();
  const navigate = useNavigate();
  const { sessionId, userId, mobileNo, userData, allowedRoutes, role } = controller;

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
    }
    if (userRole && !role) {
      setRole(dispatch, userRole);
    }
    setTimeout(() => {
      setDataFetched(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (dataFetched) {
      if (sId && uId && mNo && uData && role) {
        navigate("/dashboard");
      }
    }
  }, [dataFetched]);

  if (!dataFetched) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <DefaultNavbar transparent light />
      <SoftBox
        width="calc(100% - 2rem)"
        minHeight="50vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={4}>
            <SoftBox mt={6} mb={1}>
              <SoftTypography variant="h1" color="white" fontWeight="bold">
                {title}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography variant="body2" color="white" fontWeight="regular">
                {description}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SoftBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
