import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ConfigurationTabs from "./components/ConfigurationTabs";

export default function Configuration() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={24} lg={12}>
            <ConfigurationTabs />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}
