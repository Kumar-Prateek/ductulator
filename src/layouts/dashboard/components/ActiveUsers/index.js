import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ModalView from "examples/ModalView";
import PropTypes from "prop-types";
import { useState } from "react";
import ActiveTable from "./ActiveTable";

const modalData = (activeUsers) => (
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
    {activeUsers?.length > 0 ? (
      <ActiveTable activeUsers={activeUsers} />
    ) : (
      <SoftBox m={3}>
        <SoftTypography variant="button" color="text" fontWeight="medium">
          No Record Found
        </SoftTypography>
      </SoftBox>
    )}
  </SoftBox>
);

export default function ActiveUsers({ activeUsers }) {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <SoftBox>
      <div onClick={handleModalOpen} className="pointer">
        <MiniStatisticsCard
          title={{ text: "Active Users" }}
          percentage={{ color: "info", text: activeUsers?.length ? activeUsers?.length : 0 }}
          icon={{ color: "info", component: "people_outline_two_tone" }}
        />
      </div>

      <ModalView
        title="Active Users"
        open={open}
        modalContent={modalData(activeUsers)}
        handleClose={handleModalClose}
      />
    </SoftBox>
  );
}

ActiveUsers.propTypes = {
  activeUsers: PropTypes.array.isRequired,
};
