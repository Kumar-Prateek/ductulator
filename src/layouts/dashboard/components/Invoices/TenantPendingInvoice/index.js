import SoftBox from "components/SoftBox";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import PropTypes from "prop-types";

export default function TenantPendingInvoice({ count }) {
  return (
    <SoftBox>
      <MiniStatisticsCard
        title={{ text: "Pending Invoices" }}
        percentage={{ color: !count ? "info" : "error", text: count ? count : 0 }}
        icon={{ color: "info", component: "receipt_two_tone" }}
      />
    </SoftBox>
  );
}

TenantPendingInvoice.propTypes = {
  count: PropTypes.number,
};
