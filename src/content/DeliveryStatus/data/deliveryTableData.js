/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBadge from "components/SoftBadge";
import SoftTypography from "components/SoftTypography";

// Images
import SoftButton from "components/SoftButton";
import apiData from "./apiData";

function getBadgeColor(status) {
  switch (status) {
    case "200":
      return "success";
    case "400":
      return "error";
    default:
      return "secondary";
  }
}

const deliveryTableData = {
  columns: [
    { name: "transaction Id", align: "left" },
    { name: "mobile Number", align: "left" },
    { name: "status Code", align: "center" },
    { name: "send Reason", align: "center" },
    { name: "date", align: "center" },
    { name: "action", align: "center" },
  ],
  rows: apiData?.map((item) => ({
    "transaction Id": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium" px={2} py={0.5}>
        {item.params1}
      </SoftTypography>
    ),
    "mobile Number": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.params2}
      </SoftTypography>
    ),
    "status Code": (
      <SoftBadge
        variant="gradient"
        badgeContent={<span>{item.params3}</span>}
        color={getBadgeColor(item.params3)}
        size="md"
      />
    ),
    "send Reason": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.params4}
      </SoftTypography>
    ),
    date: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.params5}
      </SoftTypography>
    ),
    action: (
      <SoftButton variant="text" color="info" size="small">
        Details
      </SoftButton>
    ),
  })),
};

export default deliveryTableData;
