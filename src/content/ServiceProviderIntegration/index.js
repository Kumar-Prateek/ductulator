import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import ProviderList from "content/ServiceProviderIntegration/components/providerList";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import {
  addProvider,
  getProviderList,
  getUserProvider,
  registerProvider,
  removeProvider,
  setPriority,
} from "services/serviceProviderService";
import Loader from "utility/loader";
import { ShowSwalMsg, ShowSwalWithResult } from "utility/swal";
import AddProvider from "./components/addProvider";
import RegisterProvider from "./components/registerProvider";
import SetPriority from "./components/setPriority";

const initialPage = [{ providerId: "_", priority: "", name: "" }];
const allProviderDisplayKeys = ["name", "percentage", "url", "createdOn"];
const myProvidersDisplayKeys = ["name", "priority", "providerId"];

function ServiceProviderIntegration() {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId, role, userData } = controller;

  const [loading, setLoading] = useState(false);

  const [allProviderList, setAllProviderList] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(0);

  const [userProviderList, setUserProviderList] = useState([]);
  const [selectedUserProviderId, setSelectedUserProviderId] = useState(0);

  const [allUserList, setAllUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([0]);

  const [provider, setProviders] = useState(initialPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(10);
  const limit = 10;

  useEffect(() => {
    if (userId) {
      setLoading(true);
      handleFetchApiCall();
    }
  }, [userId, currentPage]);

  const handleFetchApiCall = () => {
    if (role === "admin") {
      handleGetProviderList();
    } else {
      handleGetProviderListForUser();
    }
  };

  const handleRegisterProvider = (data, e) => {
    setLoading(true);
    registerProvider(
      { ...data, percentage: parseInt(data.percentage, 10), userId },
      { sessionId, userId }
    ).then((resp) => {
      if (successService(resp)) {
        ShowSwalMsg("success", resp?.responseMessage);
        handleFetchApiCall();
        setLoading(false);
        e.target.reset();
      } else {
        setLoading(false);
        errorService({ resp });
      }
    });
  };

  const handleGetProviderList = () => {
    getProviderList({ currentPage, limit }, { sessionId, userId }).then((resp) => {
      if (successService(resp)) {
        setLoading(false);
        setAllProviderList(resp?.responseData?.data);
        setTotalRecords(resp?.responseData?.totalData);
      } else {
        setLoading(false);
        errorService({ resp });
      }
    });
  };

  const handleGetProviderListForUser = () => {
    getUserProvider({ currentPage, limit, userId }, { sessionId, userId }).then((resp) => {
      if (successService(resp)) {
        setLoading(false);
        setUserProviderList(resp?.responseData?.data[0]?.providers);
      } else {
        errorService({ resp });
        setLoading(false);
      }
    });
  };

  const handleRemoveProvider = (item) => {
    ShowSwalWithResult("question", "Do you wish to proceed?").then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeProvider({ providerId: item?.providerId, userId }, { sessionId, userId }).then(
          (resp) => {
            if (successService(resp)) {
              ShowSwalMsg("success", resp?.responseMessage);
              handleFetchApiCall();
            } else {
              setLoading(false);
              errorService({ resp });
            }
          }
        );
      }
    });
  };

  const handleSetPriority = (val, e) => {
    setLoading(true);
    setPriority(
      { ...val, priority: parseInt(val.priority, 10), userId },
      { userId, sessionId }
    ).then((resp) => {
      if (successService(resp)) {
        ShowSwalMsg("success", resp?.responseMessage);
        setSelectedProviderId(selectedProviderId + 1);
        handleFetchApiCall();
        e.target.reset();
      } else {
        setLoading(false);
        errorService({ resp });
      }
    });
  };

  const handleAddProvider = (data, e) => {
    setLoading(true);
    addProvider({ ...data, userId: data.userId ? data.userId : userId }).then((resp) => {
      if (successService(resp)) {
        ShowSwalMsg("success", resp.responseMessage);
        e.target.reset();
        handleFetchApiCall();
      } else {
        errorService({ resp });
        setLoading(false);
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox display="flex" flexDirection="column">
              <SoftBox>
                {role === "admin" ? (
                  <RegisterProvider handleRegisterProvider={handleRegisterProvider} />
                ) : (
                  <AddProvider
                    allUserList={
                      role === "admin" ? allUserList : [{ name: userData.fullName, ...userData }]
                    }
                    selectedUserId={selectedUserId}
                    allProviderList={allProviderList}
                    selectedProviderId={selectedProviderId}
                    handleAddProvider={handleAddProvider}
                    provider={provider}
                    setProviders={setProviders}
                  />
                )}
              </SoftBox>
              <SoftBox mt={4}>
                <SetPriority
                  allProviderList={userProviderList}
                  setPriority={handleSetPriority}
                  setSelectedProviderId={setSelectedProviderId}
                  selectedProviderId={selectedProviderId}
                />
              </SoftBox>
            </SoftBox>
          </Grid>

          <Grid item xs={12} md={6}>
            {role === "admin" ? (
              <ProviderList
                title="All Providers"
                allProviderList={allProviderList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                totalRecords={totalRecords}
                totalPages={Math.ceil(totalRecords / limit)}
                handleRemoveProvider={handleRemoveProvider}
                displayKeys={allProviderDisplayKeys}
              />
            ) : null}
            {role === "tenant" ? (
              <ProviderList
                title="My Providers"
                allProviderList={userProviderList}
                handleRemoveProvider={handleRemoveProvider}
                displayKeys={myProvidersDisplayKeys}
              />
            ) : null}
          </Grid>
        </Grid>
      </SoftBox>
      {loading ? <Loader /> : null}
    </DashboardLayout>
  );
}

export default ServiceProviderIntegration;
