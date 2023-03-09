import { yupResolver } from "@hookform/resolvers/yup";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { mobileNoValidation } from "validation/loginValidation";

export default function GetOtp({ handleGetOtp }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(mobileNoValidation) });

  const onSubmit = (data, e) => {
    handleGetOtp(data);
    e.target.reset();
  };

  return (
    <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
      <SoftBox mb={2}>
        <SoftInput
          placeholder="Mobile Number"
          {...register("mobileNo")}
          error={!!errors.mobileNo}
          disabled={false}
        />
        <SoftTypography variant="overline" color="error">
          {errors?.mobileNo?.message}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={4} mb={4}>
        <SoftButton variant="gradient" color="dark" fullWidth type="submit">
          Get Otp
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

GetOtp.propTypes = {
  handleGetOtp: PropTypes.func,
};
