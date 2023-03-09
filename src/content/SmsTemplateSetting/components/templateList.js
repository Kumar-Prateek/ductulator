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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import PropTypes from "prop-types";

function TemplateList({
  allTemplateList,
  handleRemoveTemplate,
  currentPage,
  setCurrentPage,
  limit,
  totalRecords,
  totalPages,
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Template List
        </SoftTypography>
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
          {allTemplateList?.length > 0 ? (
            allTemplateList.map((item) => (
              <Transaction
                key={item._id}
                color="info"
                icon="keyboard_arrow_right"
                name={item.name}
                description={item.email}
                value="Deactive"
                handleRemove={() => handleRemoveTemplate(item)}
              />
            ))
          ) : (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              No Record Found
            </SoftTypography>
          )}
        </SoftBox>
        {allTemplateList?.length > 0 ? (
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
    </Card>
  );
}

export default TemplateList;

TemplateList.propTypes = {
  allTemplateList: PropTypes.array,
  handleRemoveTemplate: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  limit: PropTypes.number,
  totalRecords: PropTypes.number,
  totalPages: PropTypes.number,
};
