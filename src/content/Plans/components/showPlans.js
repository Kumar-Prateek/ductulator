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

// @mui material components
import { Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import ListSearch from "components/ListSearch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ModalView from "examples/ModalView";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import PropTypes from "prop-types";
import { useState } from "react";

const displayKeys = [
  "planName",
  "planType",
  "activeStatus",
  "freeMsgCount",
  "msgCount",
  "planValidity",
  "price",
];

function ShowPlans({
  title,
  allPlanList,
  handleRemovePlan,
  currentPage,
  setCurrentPage,
  totalRecords,
  totalPages,
}) {
  const [data, setData] = useState(allPlanList);
  const [isSearch, setIsSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState();

  const handleModalOpen = (item) => {
    setOpen(true);
    setModalDetails(item);
  };

  const handleModalClose = () => {
    setOpen(false);
    setModalDetails();
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <ListSearch
          list={allPlanList}
          setData={setData}
          searchKey="planName"
          setIsSearch={setIsSearch}
        />
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {data?.length > 0 ? (
            data.map((item) => (
              <div key={item._id} onClick={() => handleModalOpen(item)}>
                <Transaction
                  color="info"
                  icon="keyboard_arrow_right"
                  name={item.planName}
                  description={item.planType}
                />
              </div>
            ))
          ) : (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              No Record Found
            </SoftTypography>
          )}
        </SoftBox>
        {data?.length > 0 && currentPage && !isSearch ? (
          <SoftBox display="flex" flexDirection="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              defaultPage={currentPage}
              page={currentPage}
              onChange={(_e, p) => setCurrentPage(p)}
              hideNextButton={isNaN(totalPages) || totalPages < 1}
              hidePrevButton={currentPage === 1}
              color="info"
            />
          </SoftBox>
        ) : null}
      </SoftBox>
      {modalDetails && open ? (
        <ModalView
          title="Plan Details"
          open={open}
          modalDetails={modalDetails}
          handleClose={handleModalClose}
          displayKeys={displayKeys}
        />
      ) : null}
    </Card>
  );
}

export default ShowPlans;

ShowPlans.propTypes = {
  title: PropTypes.string,
  allPlanList: PropTypes.array,
  handleRemovePlan: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalRecords: PropTypes.number,
  totalPages: PropTypes.number,
};
