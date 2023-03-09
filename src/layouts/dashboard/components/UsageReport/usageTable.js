import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";

export default function UsageTable({ usageData }) {
  return (
    <Table
      columns={[
        { name: "date", align: "left" },
        // { name: "tenant Name", align: "left" },
        { name: "delivered", align: "left" },
        { name: "submitted", align: "left" },
        { name: "delivery Percentage", align: "left" },
      ]}
      rows={usageData?.map((item) => ({
        date: (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.date}
            </SoftTypography>
          </SoftBox>
        ),
        "tenant Name": (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.tenantName}
            </SoftTypography>
          </SoftBox>
        ),
        delivered: (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.delivered}
            </SoftTypography>
          </SoftBox>
        ),
        submitted: (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.submitted}
            </SoftTypography>
          </SoftBox>
        ),
        "delivery Percentage": (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.deliveryPercentage}
            </SoftTypography>
          </SoftBox>
        ),
      }))}
    />
  );
}

UsageTable.propTypes = {
  usageData: PropTypes.array.isRequired,
};
