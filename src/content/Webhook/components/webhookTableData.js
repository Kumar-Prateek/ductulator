/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftProgress from "components/SoftProgress";
import SoftTypography from "components/SoftTypography";

// Images
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import SoftButton from "components/SoftButton";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const webhookTableData = {
  columns: [
    { name: "webhook", align: "left" },
    { name: "unique id", align: "left" },
    { name: "report type", align: "left" },
    { name: "server type", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      webhook: [logoSpotify, "Spotift"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2500
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          working
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
    {
      webhook: [logoInvesion, "Invesion"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          5000
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          done
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
    {
      webhook: [logoJira, "Jira"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          3400
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          canceled
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
    {
      webhook: [logoSlack, "Slack"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          1400
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          canceled
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
    {
      webhook: [logoWebDev, "Webdev"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          1,000
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          working
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
    {
      webhook: [logoXD, "Adobe XD"],
      "unique id": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2300
        </SoftTypography>
      ),
      "report type": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          done
        </SoftTypography>
      ),
      "server type": (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          linux
        </SoftTypography>
      ),
      action: (
        <SoftButton variant="text" color="info" size="small" onClick={() => handleRemove()}>
          Remove
        </SoftButton>
      ),
    },
  ],
};

export default webhookTableData;
