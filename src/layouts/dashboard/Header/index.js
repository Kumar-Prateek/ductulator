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
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import PropTypes from "prop-types";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons

// Images
import {
  AdminPanelSettingsTwoTone,
  BarChartTwoTone,
  DataUsageTwoTone,
  ReceiptLongTwoTone,
  SmsTwoTone,
} from "@mui/icons-material";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { useSoftUIController } from "context";

function Header({ tabsOrientation, tabValue, handleSetTabValue }) {
  const [controller, dispatch] = useSoftUIController();
  const { userData, role } = controller;

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="10rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.9),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <AdminPanelSettingsTwoTone fontSize="large" />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {userData?.fullName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {userData?.companyName}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid
            item
            xs={12}
            md={role === "admin" ? 8 : 6}
            lg={role === "admin" ? 6 : 5}
            sx={{ ml: "auto" }}
          >
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Stats" icon={<BarChartTwoTone />} />
                <Tab label="Usage" icon={<DataUsageTwoTone />} />
                <Tab label="SMS Records" icon={<SmsTwoTone />} />
                {role === "admin" ? <Tab label="Invoice" icon={<ReceiptLongTwoTone />} /> : null}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;

Header.propTypes = {
  tabsOrientation: PropTypes.string,
  tabValue: PropTypes.number,
  handleSetTabValue: PropTypes.func,
};
