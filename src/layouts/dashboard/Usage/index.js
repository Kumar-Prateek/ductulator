import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import UsageReport from "../components/UsageReport";

export default function Usage({
  providerUsageData,
  pToDate,
  pFromDate,
  setPtoDate,
  setPfromDate,
  handleGetProviderUsageReport,
  tenantUsageData,
  tToDate,
  tFromDate,
  setTtoDate,
  setTfromDate,
  handleGetTenantUsageReport,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <UsageReport
          title="Provider Usage Report"
          usageData={providerUsageData}
          toDate={pToDate}
          fromDate={pFromDate}
          setToDate={setPtoDate}
          setFromDate={setPfromDate}
          handleGetUsageReport={handleGetProviderUsageReport}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UsageReport
          title="Tenant Usage Report"
          usageData={tenantUsageData}
          toDate={tToDate}
          fromDate={tFromDate}
          setToDate={setTtoDate}
          setFromDate={setTfromDate}
          handleGetUsageReport={handleGetTenantUsageReport}
        />
      </Grid>
    </Grid>
  );
}

Usage.propTypes = {
  providerUsageData: PropTypes.array,
  pToDate: PropTypes.any,
  pFromDate: PropTypes.any,
  setPtoDate: PropTypes.func,
  setPfromDate: PropTypes.func,
  handleGetProviderUsageReport: PropTypes.func,
  tenantUsageData: PropTypes.array,
  tToDate: PropTypes.any,
  tFromDate: PropTypes.any,
  setTtoDate: PropTypes.func,
  setTfromDate: PropTypes.func,
  handleGetTenantUsageReport: PropTypes.func,
};
