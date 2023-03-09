import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import { errorService } from "services/respService/errorService";
import { successService } from "services/respService/successService";
import { addtemplate } from "services/templateService";
import AddTemplate from "./components/addTemplate";
import TemplateList from "./components/templateList";

const limit = 10;

function SmsTemplateSetting() {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId } = controller;

  const [allTemplateList, setAllTemplateList] = useState([]);
  const [allSenderList, setAllSenderList] = useState([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState(0);
  const [selectedSenderId, setSelectedSenderId] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(10);

  const handleAddTemplate = (data, e) => {
    addtemplate(data, { sessionId, userId }).then((resp) => {
      if (successService(resp)) {
        ShowSwalMsg("success", resp?.responseMessage);
        setSelectedTemplateId(selectedTemplateId + 1);
        setSelectedSenderId(selectedSenderId + 1);
        e.target.reset();
      } else {
        errorService({ resp });
      }
    });
  };

  const handleRemoveTemplate = (item) => {
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
          <Grid item xs={12} lg={6}>
            <AddTemplate
              handleAddTemplate={handleAddTemplate}
              allTemplateList={allTemplateList}
              allSenderList={allSenderList}
              selectedTemplateId={selectedTemplateId}
              selectedSenderId={selectedSenderId}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TemplateList
              allTemplateList={allTemplateList}
              handleRemoveTemplate={handleRemoveTemplate}
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

export default SmsTemplateSetting;
