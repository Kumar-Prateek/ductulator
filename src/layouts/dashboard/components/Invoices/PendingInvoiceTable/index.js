import { Card, Pagination } from "@mui/material";
import ListSearch from "components/ListSearch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import ModalView from "examples/ModalView";
import Transaction from "layouts/billing/components/Transaction";
import PropTypes from "prop-types";
import { useState } from "react";

export default function PendingInvoiceTable({ dataList, currentPage, setCurrentPage, totalPages }) {
  const [data, setData] = useState(dataList);
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
    <Card sx={{ height: "100%", mx: 2 }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          All Pending Invoice
        </SoftTypography>
        <ListSearch
          list={dataList}
          setData={setData}
          searchKey="tenantName"
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
            data?.map((item) => (
              <div key={item.tenantId} className="pointer" onClick={() => handleModalOpen(item)}>
                <Transaction
                  color="info"
                  icon="keyboard_arrow_right"
                  name={item.tenantName}
                  description={`Pending Invoices: ${item.pendingInvoice}`}
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
          title="Invoice Details"
          open={open}
          modalDetails={modalDetails}
          handleClose={handleModalClose}
          displayKeys={displayKeys}
        />
      ) : null}
    </Card>
  );
}

PendingInvoiceTable.propTypes = {
  dataList: PropTypes.array,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPages: PropTypes.number,
};
