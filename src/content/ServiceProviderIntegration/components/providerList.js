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
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

// @mui material components
import { Pagination } from "@mui/material";
import ListSearch from "components/ListSearch";
import ModalView from "examples/ModalView";
import PropTypes from "prop-types";
import { useState } from "react";

function ProviderList({
  title,
  allProviderList,
  currentPage,
  setCurrentPage,
  limit,
  totalRecords,
  totalPages,
  handleRemoveProvider,
  displayKeys,
}) {
  const [data, setData] = useState(allProviderList);
  const [isSearch, setIsSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState();

  const handleModalOpen = (item) => {
    setOpen(true);
    const selectedItem = { ...item, createdOn: new Date(item?.createdOn)?.toLocaleDateString() };
    setModalDetails(selectedItem);
  };

  const handleModalClose = () => {
    setOpen(false);
    setModalDetails();
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          Provider&apos;s List
        </SoftTypography>
        <ListSearch
          list={allProviderList}
          setData={setData}
          searchKey="name"
          setIsSearch={setIsSearch}
        />
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {title}
          </SoftTypography>
        </SoftBox>
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
              <div key={item._id} className="pointer" onClick={() => handleModalOpen(item)}>
                <Transaction
                  color="info"
                  icon="keyboard_arrow_right"
                  name={item.name}
                  description={`Priority ${
                    title === "All Providers" ? item.percentage : item.priority
                  }%`}
                  value="Deactive"
                  handleRemove={() => handleRemoveProvider(item)}
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
      <ModalView
        open={open}
        modalDetails={modalDetails}
        handleClose={handleModalClose}
        title="Provider Details"
        displayKeys={displayKeys}
      />
    </Card>
  );
}

export default ProviderList;

ProviderList.propTypes = {
  title: PropTypes.string,
  allProviderList: PropTypes.array,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  totalRecords: PropTypes.number,
  totalPages: PropTypes.number,
  handleRemoveProvider: PropTypes.func,
  displayKeys: PropTypes.array,
};
