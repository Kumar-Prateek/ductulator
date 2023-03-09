import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

export default function PlanInvoice() {
  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Plan Invoice
        </SoftTypography>
      </SoftBox>
    </Card>
  );
}
