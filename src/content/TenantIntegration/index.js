import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import AddTenant from "content/TenantIntegration/components/addTenant";
import TenantList from "content/TenantIntegration/components/tenantList";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { getAllPlans } from "services/planService";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import { addTenant, removeTenant } from "services/tenantService";
import { ShowSwalMsg, ShowSwalWithResult } from "utility/swal";

function TenantIntegration() {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId } = controller;

  const [allTenantList, setAllTenantList] = useState([]);
  const [allAccountTypeList, setAllAccountTypeList] = useState([
    { value: "PREPAID", label: "PREPAID" },
    { value: "POSTPAID", label: "POSTPAID" },
  ]);
  const [selectedAccountType, setSelectedAccountType] = useState(0);
  const [selectedPlanType, setSelectedPlanType] = useState(0);
  const [allPlans, setAllPlans] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(10);

  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [gstinImage, setGstinImage] = useState(null);

  const limit = 10;

  useEffect(() => {
    if (userId) {
      getAllPlans({ planType: "ALL", currentPage: 1, limit: 10 }).then((resp) => {
        if (successService(resp)) {
          setAllPlans(resp.responseData?.data);
        } else {
          errorService({ resp });
        }
      });
    }
  }, [userId]);

  const handleAddTenant = (data, e) => {
    const payload = {
      ...data,
      plans: [data.planType],
    };
    const formData = new FormData();
    formData.append("fullName", payload.fullName);
    formData.append("emailId", payload.emailId);
    formData.append("companyName", payload.companyName);
    formData.append("mobileNo", payload.mobileNo);
    formData.append("aadharNo", payload.aadharNo);
    formData.append("panNo", payload.panNo);
    formData.append("gstinNo", payload.gstinNo);
    formData.append("senderId", payload.senderId);
    formData.append("entityId", payload.entityId);
    formData.append("identifier", payload.identifier);
    formData.append("aadharImage", aadharImage);
    formData.append("panImage", panImage);
    formData.append("gstinImage", gstinImage);
    formData.append("accountType", payload.accountType);
    formData.append("plans", payload.plans);
    formData.append("role", "tenant");

    addTenant(formData, { sessionId, userId }).then((resp) => {
      if (successService(resp)) {
        ShowSwalMsg("success", resp?.responseMessage);
        setSelectedAccountType(selectedAccountType + 1);
        setSelectedPlanType(selectedPlanType + 1);
        setAadharImage(null);
        setPanImage(null);
        setGstinImage(null);
        e.target.reset();
      } else {
        errorService({ resp });
      }
    });
  };

  const handleRemoveTenant = (item) => {
    ShowSwalWithResult("question", "Do you wish to proceed?").then((result) => {
      if (result.isConfirmed) {
        removeTenant({ userId: item }, { sessionId, userId }).then((resp) => {
          if (successService(resp)) {
            ShowSwalMsg("success", resp?.responseMessage);
          } else {
            errorService({ resp });
          }
        });
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <AddTenant
              handleAddTenant={handleAddTenant}
              allAccountTypeList={allAccountTypeList}
              selectedAccountType={selectedAccountType}
              allPlanType={allPlans}
              selectedPlanType={selectedPlanType}
              setSelectedPlanType={setSelectedPlanType}
              setAadharImage={setAadharImage}
              setPanImage={setPanImage}
              setGstinImage={setGstinImage}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TenantList
              allTenantList={allTenantList}
              handleRemoveTenant={handleRemoveTenant}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
              totalRecords={totalRecords}
              totalPages={Math.ceil(totalRecords / limit)}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default TenantIntegration;
