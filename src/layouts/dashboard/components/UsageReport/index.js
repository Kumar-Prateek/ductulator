import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

import "flatpickr/dist/themes/material_green.css";

import { SearchTwoTone } from "@mui/icons-material";
import SoftButton from "components/SoftButton";
import Flatpickr from "react-flatpickr";
import UsageTable from "./usageTable";

export default function UsageReport({
  title,
  usageData,
  toDate,
  fromDate,
  setToDate,
  setFromDate,
  handleGetUsageReport,
}) {
  const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

  const getDisabledMaxDate = (date) => {
    if (
      new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) ||
      datediff(date, new Date()) <= 6
    ) {
      return new Date();
    } else {
      return new Date(date).fp_incr(6);
    }
  };

  const getDisabledMinDate = (date) => {
    return new Date(date).fp_incr(-6);
  };

  return (
    <Card>
      <SoftBox p={3}>
        <SoftTypography variant="h6" gutterBottom>
          {title}
        </SoftTypography>

        <SoftBox
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          lineHeight={0}
        >
          <SoftBox display="flex" flexWrap="wrap" lineHeight={0}>
            <SoftBox m={1}>
              <SoftTypography mr={0.5} variant="button">
                From:
              </SoftTypography>
              <Flatpickr
                value={new Date(fromDate)}
                key={toDate?.toString()}
                className="flatpickerClass"
                options={{ maxDate: new Date() }}
                onChange={([date]) => {
                  setFromDate(date);
                  setToDate(date);
                }}
              />
            </SoftBox>
            <SoftBox m={1}>
              <SoftTypography mr={0.5} variant="button">
                To:
              </SoftTypography>
              <Flatpickr
                value={new Date(toDate)}
                key={fromDate?.toString()}
                enableTime={false}
                options={{
                  maxDate: getDisabledMaxDate(fromDate),
                  minDate: getDisabledMinDate(fromDate),
                }}
                className="flatpickerClass"
                onChange={([date]) => {
                  setToDate(date);
                }}
              />
            </SoftBox>

            <SoftButton
              iconOnly
              size="small"
              color="info"
              variant="gradient"
              sx={{ m: 1.3 }}
              onClick={() => handleGetUsageReport()}
            >
              <SearchTwoTone />
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>

      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        {usageData?.length > 0 ? (
          <UsageTable usageData={usageData} />
        ) : (
          <SoftBox m={3}>
            <SoftTypography variant="button" color="text" fontWeight="medium">
              No Record Found
            </SoftTypography>
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

UsageReport.propTypes = {
  title: PropTypes.string,
  usageData: PropTypes.array.isRequired,
  toDate: PropTypes.any.isRequired,
  fromDate: PropTypes.any.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  handleGetUsageReport: PropTypes.func,
};
