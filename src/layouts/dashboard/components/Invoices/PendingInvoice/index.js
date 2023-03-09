import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import PropTypes from "prop-types";

export default function PendingInvoice(props) {
  const { dataList, setTab } = props;

  const handleOpenInvoiceTab = () => {
    setTab(2);
  };

  return (
    <div onClick={handleOpenInvoiceTab} className="pointer">
      <MiniStatisticsCard
        title={{ text: "Pending Invoices" }}
        percentage={{ color: "info", text: dataList?.length ? dataList?.length : 0 }}
        icon={{ color: "info", component: "receipt_long_two_tone" }}
      />
    </div>
  );
}

PendingInvoice.propTypes = {
  dataList: PropTypes.array,
  setTab: PropTypes.func,
};
