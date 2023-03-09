import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WebhookTable from "./components/webhookTable";

export default function Webhook() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={24} lg={12}>
            <WebhookTable />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}
