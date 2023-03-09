import { Pagination } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Transaction from "layouts/billing/components/Transaction";
import PropTypes from "prop-types";

export default function IpWhitelist({
  allIpList,
  handleRemoveIp,
  currentPage,
  setCurrentPage,
  limit,
  totalRecords,
  totalPages,
}) {
  return (
    <>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Whitelisted Ip
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
          {allIpList?.length > 0 ? (
            allIpList.map((item) => (
              <Transaction key={item} color="info" icon="keyboard_arrow_right" name={item} />
            ))
          ) : (
            <SoftTypography variant="button" color="text" fontWeight="medium">
              No Record Found
            </SoftTypography>
          )}
        </SoftBox>
        {allIpList?.length > 0 && currentPage ? (
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
    </>
  );
}

IpWhitelist.propTypes = {
  allIpList: PropTypes.array,
  handleRemoveIp: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  limit: PropTypes.number,
  totalRecords: PropTypes.number,
  totalPages: PropTypes.number,
};
