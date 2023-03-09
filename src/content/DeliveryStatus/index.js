import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import deliveryTableData from "content/DeliveryStatus/data/deliveryTableData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

export default function DeliveryStatus() {
  const { columns, rows } = deliveryTableData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={24} lg={24}>
            <Card sx={{ p: 2 }}>
              <SoftBox mb={2}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Delivery Status
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <SoftBox mb={2} display="flex" flexDirection="row">
                    <Grid item xs={12} lg={12}>
                      <SoftBox m={1}>
                        <SoftInput type="text" placeholder="Contact Number" fullWidth />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <SoftBox m={1} display="flex" flexDirection="row">
                        <SoftButton variant="gradient" color="info" sx={{ mx: 1 }}>
                          Submit
                        </SoftButton>
                        <SoftButton variant="gradient" color="secondary" sx={{ mx: 1 }}>
                          Reset
                        </SoftButton>
                      </SoftBox>
                    </Grid>
                  </SoftBox>
                </Grid>
              </Grid>
            </Card>
            <SoftBox my={2}>
              <Grid container spacing={3}>
                <Grid item xs={24} lg={24}>
                  <Card>
                    <SoftBox m={2}>
                      <SoftTypography variant="h5" fontWeight="medium">
                        History
                      </SoftTypography>
                    </SoftBox>
                    <Table columns={columns} rows={rows} />
                  </Card>
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}
