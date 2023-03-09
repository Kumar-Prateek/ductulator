/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UI Dashboard React components
import breakpoints from "assets/theme/base/breakpoints";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import { format } from "date-fns";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "./Header";

// Soft UI Dashboard React base styles

// Dashboard layout components

// Data
import TabPanel from "content/Configuration/components/TabPanel";
import { useEffect, useState } from "react";
import {
  getActiveUser,
  getMobileNumberRecord,
  getPendingInvoice,
  getPlanExpiration,
  getProviderUsage,
  getTenantPendingInvoice,
  getTenantUsage,
  getUsageReport,
} from "services/dashboardService";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import Loader from "utility/loader";
import PendingInvoiceTable from "./components/Invoices/PendingInvoiceTable";
import SmsRecords from "./SmsRecords";
import Stats from "./Stats";
import Usage from "./Usage";

const limit = 10;

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, userData, location, sessionId, userId, mobileNumber, role } =
    controller;

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [providerUsageData, setProviderUsageData] = useState([]);
  const [tenantUsageData, setTenantUsageData] = useState([]);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [pFromDate, setPfromDate] = useState(new Date());
  const [pToDate, setPtoDate] = useState(new Date());

  const [tFromDate, setTfromDate] = useState(new Date());
  const [tToDate, setTtoDate] = useState(new Date());

  const [pendingInvoiceData, setPendingInvoiceData] = useState([]);
  const [pidCurrentPage, setPidCurrentPage] = useState(1);
  const [pidTotalRecords, setPidTotalRecords] = useState(0);

  const [tPendingInvoiceData, setTpendingInvoiceData] = useState(0);
  const [planExpirationData, setPlanExpirationData] = useState([]);

  const [mNoRecord, setMnoRecord] = useState([]);
  const [mNoCurrentPage, setMnoCurrentPage] = useState(0);
  const [mNoTotalRecords, setMnoTotalRecords] = useState(0);
  const [selectedSMSId, setSelectedSMSId] = useState(0);
  const [selectedSMS, setSelectedSMS] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial tabValue.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(() => {
    if (userId) {
      handleGetPendingInvoice();
      handleGetPlanExpiration();

      handleGetProviderUsageReport();
      handleGetTenantUsageReport();
      handleGetTenantPendingInvoice();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && role) {
      handleGetActiveUsers();
      handleGetUsageReport();
    }
  }, [userId, role]);

  const handleGetActiveUsers = () => {
    setLoading(true);
    getActiveUser().then((resp) => {
      if (successService(resp)) {
        setActiveUsers(resp.responseData.data);
      } else {
        setActiveUsers([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetUsageReport = () => {
    setLoading(true);
    getUsageReport({
      tenantId: userId,
      from: format(fromDate, "MM/dd/yyyy"),
      to: format(toDate, "MM/dd/yyyy"),
    }).then((resp) => {
      if (successService(resp)) {
        setUsageData(resp.responseData.data);
      } else {
        setUsageData([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetProviderUsageReport = () => {
    setLoading(true);
    getProviderUsage({
      tenantId: userId,
      from: format(pFromDate, "MM/dd/yyyy"),
      to: format(pToDate, "MM/dd/yyyy"),
    }).then((resp) => {
      if (successService(resp)) {
        setProviderUsageData(resp.responseData.data);
      } else {
        setProviderUsageData([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetTenantUsageReport = () => {
    setLoading(true);
    getTenantUsage({
      userId,
      from: format(tFromDate, "MM/dd/yyyy"),
      to: format(tToDate, "MM/dd/yyyy"),
    }).then((resp) => {
      if (successService(resp)) {
        setTenantUsageData(resp.responseData.data);
      } else {
        setTenantUsageData([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetPendingInvoice = () => {
    setLoading(true);
    getPendingInvoice().then((resp) => {
      if (successService(resp)) {
        setPendingInvoiceData(resp.responseData.data);
        setPidTotalRecords(resp.responseData.data?.length);
      } else {
        setPendingInvoiceData([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetTenantPendingInvoice = () => {
    setLoading(true);
    getTenantPendingInvoice({ userId }).then((resp) => {
      if (successService(resp)) {
        setTpendingInvoiceData(resp.responseData.data[0].pendigInvoice);
      } else {
        setTpendingInvoiceData(0);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetPlanExpiration = () => {
    setLoading(true);
    getPlanExpiration().then((resp) => {
      if (successService(resp)) {
        setPlanExpirationData(resp.responseData.data);
      } else {
        setPlanExpirationData([]);
        errorService({ resp, isGet: true, isToast: true });
      }
      setLoading(false);
    });
  };

  const handleGetMobileNumberRecord = (data, e) => {
    setLoading(true);
    getMobileNumberRecord({
      ...data,
      limit,
      currentPage: mNoCurrentPage,
    }).then((resp) => {
      if (successService(resp)) {
        setMnoRecord(resp.responseData?.data[0]?.data);
        setMnoTotalRecords(resp?.responseData?.totalData);
      } else {
        errorService({ resp, isGet: true, isToast: true });
        setMnoRecord([]);
        setMnoTotalRecords(0);
      }
      e.target.reset();
      setLoading(false);
      setSelectedSMS(selectedSMS + 1);
    });
  };

  return (
    <DashboardLayout>
      <Header
        tabsOrientation={tabsOrientation}
        tabValue={tabValue}
        handleSetTabValue={handleSetTabValue}
      />
      <SoftBox py={3}>
        <TabPanel value={tabValue} index={0}>
          <Stats
            role={role}
            activeUsers={activeUsers}
            tPendingInvoiceData={tPendingInvoiceData}
            pendingInvoiceData={pendingInvoiceData}
            setTab={setTabValue}
            usageData={usageData}
            toDate={toDate}
            fromDate={fromDate}
            setToDate={setToDate}
            setFromDate={setFromDate}
            handleGetUsageReport={handleGetUsageReport}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Usage
            providerUsageData={providerUsageData}
            pToDate={pToDate}
            pFromDate={pFromDate}
            setPtoDate={setPtoDate}
            setPfromDate={setPfromDate}
            handleGetProviderUsageReport={handleGetProviderUsageReport}
            tenantUsageData={tenantUsageData}
            tToDate={tToDate}
            tFromDate={tFromDate}
            setTtoDate={setTtoDate}
            setTfromDate={setTfromDate}
            handleGetTenantUsageReport={handleGetTenantUsageReport}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SmsRecords selectedSMS={selectedSMS} handleGetSmsRecord={handleGetMobileNumberRecord} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <PendingInvoiceTable
            dataList={pendingInvoiceData}
            currentPage={pidCurrentPage}
            setCurrentPage={(p) => setPidCurrentPage(p)}
            totalRecords={pidTotalRecords}
            totalPages={Math.ceil(pidTotalRecords / limit)}
            size="lg"
          />
        </TabPanel>
      </SoftBox>
      {loading ? <Loader /> : null}
    </DashboardLayout>
  );
}

export default Dashboard;
