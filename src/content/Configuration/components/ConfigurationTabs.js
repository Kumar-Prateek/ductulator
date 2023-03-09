import { AppBar, Card, Grid, Tab, Tabs } from "@mui/material";
import breakpoints from "assets/theme/base/breakpoints";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  generateToken,
  getAllowedIP,
  getGenerateToken,
  whitelistIp,
} from "services/configurationService";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import Loader from "utility/loader";
import { ShowSwalMsg } from "utility/swal";
import showToast from "utility/toast";
import AddIp from "./addIp";
import IpWhitelist from "./ipWhitelist";
import TabPanel from "./TabPanel";
import Token from "./token";

export default function ConfigurationTabs() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [allIpList, setAllIpList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(10);
  const limit = 10;

  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId } = controller;
  const [token, setToken] = useState("");

  useEffect(() => {
    if (userId) {
      setLoading(true);
      handleGetToken();
      handleGetAllowedIP();
    }
  }, [userId]);

  const handleGenerateToken = () => {
    setLoading(true);
    generateToken({ userId }).then((resp) => {
      if (successService(resp)) {
        setToken(resp?.responseData?.data);
        showToast("success", resp?.responseMessage);
        setLoading(false);
      } else {
        errorService({ resp });
        setLoading(false);
      }
    });
  };

  const handleGetAllowedIP = () => {
    getAllowedIP({ userId }).then((resp) => {
      if (successService(resp)) {
        setLoading(false);
        setAllIpList(resp.responseData.data);
      } else {
        setLoading(false);
        setAllIpList([]);
        showToast("error", resp.responseMessage);
      }
    });
  };

  const handleGetToken = () => {
    getGenerateToken({ userId }).then((resp) => {
      if (successService(resp)) {
        setToken(resp?.responseData?.data);
        setLoading(false);
      } else {
        setToken("");
        errorService({ resp });
        setLoading(false);
      }
    });
  };

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

  const handleAddIp = (data, e) => {
    setLoading(true);
    whitelistIp({ userId, allowedIp: [data.ip] }, { userId }).then((resp) => {
      if (successService(resp)) {
        setLoading(false);
        e.target.reset();
        ShowSwalMsg("success", resp.responseMessage);
      } else {
        errorService({ resp });
        setLoading(false);
      }
    });
  };

  const handleRemoveIp = (data) => {};

  return (
    <SoftBox>
      <Grid container spacing={3} mb={3} alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <AppBar position="static">
            <Tabs
              orientation={tabsOrientation}
              value={tabValue}
              onChange={handleSetTabValue}
              sx={{ background: "transparent" }}
            >
              <Tab label="Token" icon={<Document />} />
              <Tab label="Ip Whitelist" icon={<Settings />} />
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>

      <TabPanel value={tabValue} index={0}>
        <Card sx={{ p: 2 }}>
          <Token token={token} handleGetToken={handleGenerateToken} />
        </Card>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ p: 2 }}>
              <AddIp handleAddIp={handleAddIp} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ p: 2 }}>
              <IpWhitelist
                allIpList={allIpList}
                handleRemoveIp={handleRemoveIp}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                totalRecords={totalRecords}
                totalPages={Math.ceil(totalRecords / limit)}
              />
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      {loading ? <Loader /> : null}
    </SoftBox>
  );
}

ConfigurationTabs.propTypes = {
  handleGetToken: PropTypes.func,
  token: PropTypes.string,
};
