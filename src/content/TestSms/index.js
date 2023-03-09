import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";

export default function TestSms() {
  const tempIdOptions = [
    { value: "123", label: "123" },
    { value: "456", label: "456" },
    { value: "789", label: "789" },
  ];
  const providerListOptions = [
    { value: "providerA", label: "Provider A" },
    { value: "providerB", label: "Provider B" },
    { value: "providerC", label: "Provider C" },
  ];

  const [tempId, setTempId] = useState("");
  const [provider, setProvider] = useState("");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={24} lg={24}>
            <Card sx={{ p: 2 }}>
              <SoftBox mb={2}>
                <SoftTypography variant="h5" fontWeight="medium">
                  Test SMS
                </SoftTypography>
              </SoftBox>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <SoftBox display="flex" flexDirection="row">
                    <Grid item xs={12} lg={12}>
                      <SoftBox m={1}>
                        <SoftSelect
                          options={tempIdOptions}
                          value={tempId}
                          handleChange={(val) => setTempId(val)}
                          placeholder="Template Id"
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <SoftBox m={1}>
                        <SoftSelect
                          options={providerListOptions}
                          value={provider}
                          handleChange={(val) => setProvider(val)}
                          placeholder="Provider List"
                        />
                      </SoftBox>
                    </Grid>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <SoftBox display="flex" flexDirection="row">
                    <Grid item xs={12} lg={12}>
                      <SoftBox mx={1}>
                        <SoftInput type="text" placeholder="Contact Number" fullWidth required />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <SoftBox mx={1}>
                        <SoftInput type="text" placeholder="Template Parameters" fullWidth />
                      </SoftBox>
                    </Grid>
                  </SoftBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <SoftBox mt={1} mb={1} display="grid" justifyContent="center" alignItems="center">
                    <SoftButton variant="gradient" color="info">
                      Submit
                    </SoftButton>
                  </SoftBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}
