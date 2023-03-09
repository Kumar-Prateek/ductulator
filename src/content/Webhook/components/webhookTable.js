import Table from "examples/Tables/Table";

import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import webhookTableData from "./webhookTableData";

export default function WebhookTable() {
  const { columns: prCols, rows: prRows } = webhookTableData;

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Manage Webhooks</SoftTypography>
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={prCols} rows={prRows} />
      </SoftBox>
    </Card>
  );
}
