import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const changeCase = (s) => s.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ModalView({
  open,
  modalDetails,
  handleClose,
  displayKeys,
  title,
  modalContent,
  size,
}) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth={size ? size : "sm"}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {modalContent ? (
          modalContent
        ) : (
          <TableContainer sx={{ m: 0, p: 0 }}>
            <Table size="small" aria-label="a dense table">
              {modalDetails &&
                displayKeys?.map((item) => (
                  <TableRow key={item}>
                    {modalDetails[item]?.toString() ? (
                      <>
                        <TableCell variant="head" sx={{ px: 2, fontSize: "14px" }}>
                          {changeCase(item)}
                        </TableCell>
                        <TableCell sx={{ px: 2, fontSize: "14px" }}>
                          {modalDetails[item]?.toString()}
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ))}
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
}

ModalView.propTypes = {
  open: PropTypes.bool,
  modalDetails: PropTypes.any,
  handleClose: PropTypes.func,
  displayKeys: PropTypes.array,
  title: PropTypes.string,
  modalContent: PropTypes.any,
  size: PropTypes.string,
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
