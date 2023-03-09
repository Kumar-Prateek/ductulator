import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import ActiveUsers from "../components/ActiveUsers";
import PendingInvoice from "../components/Invoices/PendingInvoice";
import TenantPendingInvoice from "../components/Invoices/TenantPendingInvoice";
import TenantCount from "../components/TenantCount";
import UsageReport from "../components/UsageReport";

export default function Stats({
  role,
  activeUsers,
  tPendingInvoiceData,
  pendingInvoiceData,
  setTab,
  usageData,
  toDate,
  fromDate,
  setToDate,
  setFromDate,
  handleGetUsageReport,
}) {
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={6} md={4}>
          {role === "admin" ? <ActiveUsers activeUsers={activeUsers} /> : null}
          {role === "tenant" ? <TenantPendingInvoice count={tPendingInvoiceData} /> : null}
        </Grid>
        {role === "admin" ? (
          <Grid item xs={6} md={4}>
            <PendingInvoice dataList={pendingInvoiceData} setTab={setTab} />
          </Grid>
        ) : null}
        <Grid item xs={6} md={4}>
          <TenantCount />
        </Grid>
      </Grid>
      {role === "admin" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <UsageReport
              title="All Usage Report"
              usageData={usageData}
              toDate={toDate}
              fromDate={fromDate}
              setToDate={setToDate}
              setFromDate={setFromDate}
              handleGetUsageReport={handleGetUsageReport}
            />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

Stats.propTypes = {
  role: PropTypes.string,
  activeUsers: PropTypes.array,
  tPendingInvoiceData: PropTypes.number,
  pendingInvoiceData: PropTypes.array,
  setTab: PropTypes.func,
  usageData: PropTypes.array,
  toDate: PropTypes.any,
  fromDate: PropTypes.any,
  setToDate: PropTypes.func,
  setFromDate: PropTypes.func,
  handleGetUsageReport: PropTypes.func,
};
