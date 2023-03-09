import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { registerProviderValidation } from "validation/serviceProviderValidation";

export default function RegisterProvider({ handleRegisterProvider }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(registerProviderValidation) });

  const onSubmit = (data, e) => {
    handleRegisterProvider(data, e);
  };
  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Register Provider
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Provider Name"
            {...register("name")}
            error={!!errors.name}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.name?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="url"
            placeholder="Provider URL"
            {...register("url")}
            error={!!errors.url}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.url?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="number"
            placeholder="Provider Percentage"
            {...register("percentage")}
            error={!!errors.percentage}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.percentage?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1} display="grid" justifyContent="center" alignItems="center">
          <SoftButton variant="gradient" color="info" type="submit">
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

RegisterProvider.propTypes = {
  handleRegisterProvider: PropTypes.func,
};
