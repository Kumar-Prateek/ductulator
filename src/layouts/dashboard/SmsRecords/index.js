import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import TenantId from "examples/TenantId";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { messageRecordValidation } from "validation/smsValidation";

export default function SmsRecords({ handleGetSmsRecord, selectedSMS }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(messageRecordValidation) });

  const onSubmit = (data, e) => {
    handleGetSmsRecord(data, e);
  };
  return (
    <Card sx={{ p: 2 }}>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <SoftBox mb={2}>
              <TenantId setValue={setValue} errors={errors} selectedId={selectedSMS} />
              <SoftTypography variant="overline" color="error">
                {errors?.tenantId?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={5}>
            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="Mobile No"
                {...register("mobileNo")}
                error={!!errors.mobileNo}
              />

              <SoftTypography variant="overline" color="error">
                {errors?.mobileNo?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={2}>
            <SoftBox justifyContent="center" alignItems="center">
              <SoftButton variant="gradient" color="info" type="submit">
                Submit
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

SmsRecords.propTypes = {
  handleGetSmsRecord: PropTypes.func,
  selectedSMS: PropTypes.number,
};
