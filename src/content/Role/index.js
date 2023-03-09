import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createRef, useState } from "react";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import { addRole, getRoleData, updateRole } from "services/roleService";
import showToast from "utility/toast";
import GetRole from "./components/getRole";
import ManageRole from "./components/manageRole";

const initalState = [
  { pageName: "dashboard", allowed: false, label: "Dashboard" },
  { pageName: "sign-in", allowed: false, label: "Sign In" },
  { pageName: "provider-integration", allowed: false, label: "Provider Integration" },
  { pageName: "template-setting", allowed: false, label: "Template Setting" },
  { pageName: "delivery-status", allowed: false, label: "Delivery Status" },
  { pageName: "test-sms", allowed: false, label: "Test SMS" },
  { pageName: "tenant-integration", allowed: false, label: "Tenant Integration" },
  { pageName: "webhook", allowed: false, label: "Webhook" },
  { pageName: "configuration", allowed: false, label: "Configuration" },
  { pageName: "plans", allowed: false, label: "Plans" },
  { pageName: "role", allowed: false, label: "Role" },
  { pageName: "pendingInvoices", allowed: false, label: "Pending Invoices" },
];

export default function Role() {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId } = controller;
  const [role, setRole] = useState("");
  const [roleData, setRoleData] = useState("");
  const [isRole, setIsRole] = useState(false);
  const [pages, setPages] = useState(initalState);

  const roleRef = createRef(null);
  const manageRef = createRef(null);

  const handleAddRole = (data, e) => {
    addRole(data, { userId }).then((resp) => {
      if (successService(resp)) {
        e.target.reset();
        setRole("");
        setRoleData("");
        setIsRole(false);
        showToast("success", resp.responseMessage);
      } else {
        errorService({ resp });
      }
    });
  };

  const handleUpdateRole = (data, e) => {
    updateRole(data, { userId }).then((resp) => {
      if (successService(resp)) {
        e.target.reset();
        setRole("");
        setRoleData("");
        setIsRole(false);
        showToast("success", resp.responseMessage);
      } else {
        errorService({ resp });
      }
    });
  };

  const handleRoleSubmit = (data, e) => {
    if (roleData) {
      handleUpdateRole(data, e);
    } else {
      handleAddRole(data, e);
    }
  };

  const handleGetRoleData = () => {
    getRoleData({ role }).then((resp) => {
      if (successService(resp)) {
        const rData = resp.responseData?.data[0]?.pages;
        setRoleData(rData);
        setIsRole(true);
        const arra1 = initalState.map((item) => {
          const item2 = rData.find((i2) => i2.pageName === item.pageName);
          return item2 ? { ...item, ...item2 } : item;
        });
        setPages(arra1);
        showToast("success", resp.responseMessage);
      } else {
        errorService({ resp });
      }
    });
  };

  const handleResetForm = () => {
    setRole("");
    setIsRole(false);
    setRoleData("");
    roleRef?.current?.reset();
    manageRef?.current?.reset();
    setPages(initalState);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            {!isRole ? (
              <GetRole handleGetRoleData={handleGetRoleData} setRole={setRole} roleRef={roleRef} />
            ) : (
              <ManageRole
                handleRoleSubmit={handleRoleSubmit}
                role={role}
                manageRef={manageRef}
                pages={pages}
                setPages={setPages}
                handleResetForm={handleResetForm}
                roleData={roleData}
                initalState={initalState}
              />
            )}
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}
