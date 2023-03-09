import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Bars } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  height: "100vh",
  bgcolor: "background.paper",
  opacity: 0.5,
  boxShadow: 24,
  borderRadius: 5,
  px: 10,
  py: 7.5,
  zIndex: 999999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
};

export default function Loader() {
  return (
    <Modal open={true} disableEscapeKeyDown>
      <Box sx={style}>
        <SoftBox p={2}>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </SoftBox>
        <SoftBox p={2}>
          <SoftTypography fontWeight="medium" varinat="h6">
            Loading...
          </SoftTypography>
        </SoftBox>
      </Box>
    </Modal>
  );
}
