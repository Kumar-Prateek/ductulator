import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";

export default function ActiveTable({ activeUsers }) {
  return (
    <Table
      columns={[
        { name: "name", align: "left" },
        { name: "status", align: "left" },
      ]}
      rows={activeUsers.map((item) => ({
        name: (
          <SoftBox ml={2}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              {item.name ?? item?.tennantName}
            </SoftTypography>
          </SoftBox>
        ),
        status: (
          <SoftBox>
            <SoftBadge color="success" size="small" badgeContent="active" />
          </SoftBox>
        ),
      }))}
    />
  );
}

ActiveTable.propTypes = {
  activeUsers: PropTypes.array.isRequired,
};
