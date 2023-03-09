import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { addPlan, getAllPlans, getMyPlans, registerPlan } from "services/planService";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import Loader from "utility/loader";
import showToast from "utility/toast";
import AddPlan from "./components/addPlan";
import RegisterPlan from "./components/registerPlan";
import ShowPlans from "./components/showPlans";

const limit = 10;

export default function Plans() {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId, role } = controller;
  const [loading, setLoading] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState(0);

  const [myPlanList, setMyPlanList] = useState([]);
  const [myPlanCurrentPage, setMyPlanCurrentPage] = useState(1);
  const [myPlanTotalRecords, setMyPlanTotalRecords] = useState(0);

  const [allPlanList, setAllPlanList] = useState([]);
  const [allPlanCurrentPage, setAllPlanCurrentPage] = useState(1);
  const [allPlanTotalRecords, setAllPlanTotalRecords] = useState(0);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      handleGetAllPlans();
    }
  }, [allPlanCurrentPage, userId]);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      handleGetMyPlans();
    }
  }, [myPlanCurrentPage, userId]);

  const handleAddPlan = (data, e) => {
    setLoading(true);
    addPlan({ userId, plans: [data] }).then((resp) => {
      if (successService(resp)) {
        setSelectedPlanType(selectedPlanType + 1);
        setLoading(false);
        e.target.reset();
      } else {
        setLoading(false);
        errorService({ resp });
      }
    });
  };

  const handleRegisterPlan = (data, e) => {
    registerPlan({ ...data, userId }).then((resp) => {
      if (successService(resp)) {
        setLoading(false);
        setSelectedPlanType(selectedPlanType + 1);
        showToast("success", resp.responseMessage);
        handleGetAllPlans();
        e.target.reset();
      } else {
        setLoading(false);
        errorService({ resp });
      }
    });
  };

  const handleRemovePlan = (item) => {
    console.log(item);
  };

  const handleRemoveMyPlan = (item) => {
    console.log(item);
  };

  const handleGetAllPlans = () => {
    getAllPlans({
      planType: "ALL",
      currentPage: allPlanCurrentPage,
      limit: 10,
    }).then((resp) => {
      if (successService(resp)) {
        setAllPlanList(resp.responseData?.data);
        setAllPlanTotalRecords(resp.responseData.totalData);
        setLoading(false);
      } else {
        errorService({ resp });
        setLoading(false);
      }
    });
  };

  const handleGetMyPlans = () => {
    getMyPlans({ userId }).then((resp) => {
      if (successService(resp)) {
        setMyPlanList(resp.responseData?.data);
        setMyPlanTotalRecords(resp?.responseData?.totalRecords);
        setLoading(false);
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
            {role === "admin" ? (
              <RegisterPlan
                handleRegisterPlan={handleRegisterPlan}
                selectedPlanType={selectedPlanType}
              />
            ) : (
              <AddPlan
                handleAddPlan={handleAddPlan}
                selectedPlanType={selectedPlanType}
                allPlanList={allPlanList}
              />
            )}
            <SoftBox mt={4}>
              <ShowPlans
                title="My Plans"
                allPlanList={myPlanList}
                handleRemovePlan={handleRemoveMyPlan}
                currentPage={myPlanCurrentPage}
                setCurrentPage={(p) => setMyPlanCurrentPage(p)}
                totalRecords={myPlanTotalRecords}
                totalPages={Math.ceil(myPlanTotalRecords / limit)}
              />
            </SoftBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <ShowPlans
              title="All Plans"
              allPlanList={allPlanList}
              handleRemovePlan={handleRemovePlan}
              currentPage={allPlanCurrentPage}
              setCurrentPage={(p) => setAllPlanCurrentPage(p)}
              totalRecords={allPlanTotalRecords}
              totalPages={Math.ceil(allPlanTotalRecords / limit)}
            />
          </Grid>
        </Grid>
      </SoftBox>
      {loading ? <Loader /> : null}
    </DashboardLayout>
  );
}
