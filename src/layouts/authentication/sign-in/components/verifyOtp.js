import { yupResolver } from "@hookform/resolvers/yup";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { otpValidation } from "validation/loginValidation";

export default function VerifyOtp({ mobileNo, handleVerifyOtp, resetForm, resendOtp }) {
  const defaultValues = {
    mobileNo,
    otp: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange", resolver: yupResolver(otpValidation) });

  const onSubmit = (data) => handleVerifyOtp(data);
  const [resendEnable, setResendEnable] = useState(true);

  useEffect(() => {
    if (resendEnable) {
      setTimeout(() => {
        setResendEnable(false);
      }, 60000);
    }
  }, [resendEnable]);

  const handleResendOtp = () => {
    resendOtp(mobileNo);
    setResendEnable(true);
  };

  return (
    <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
      <SoftBox mb={2}>
        <SoftInput
          placeholder="Mobile Number"
          {...register("mobileNo")}
          error={!!errors.mobileNo}
          disabled={true}
        />
        {errors?.mobileNo?.message ? (
          <SoftTypography variant="overline" color="error">
            {errors?.mobileNo?.message}
          </SoftTypography>
        ) : null}
      </SoftBox>
      <SoftBox mb={2}>
        <SoftInput placeholder="Otp" {...register("otp")} error={!!errors.otp} disabled={false} />
        {errors?.otp?.message ? (
          <SoftTypography variant="overline" color="error">
            {errors?.otp?.message}
          </SoftTypography>
        ) : null}
      </SoftBox>

      <SoftBox mt={4} mb={1}>
        <SoftButton
          variant="gradient"
          type="button"
          color="secondary"
          fullWidth
          onClick={() => resetForm()}
        >
          Cancel
        </SoftButton>
      </SoftBox>
      <SoftBox mt={1} mb={1}>
        <SoftButton variant="gradient" type="submit" color="dark" fullWidth>
          Submit
        </SoftButton>
      </SoftBox>
      <SoftBox mt={1} mb={4} display="flex" justifyContent="flex-end">
        {resendEnable ? (
          <SoftTypography variant="overline" color="secondary">
            Resend Otp in 1 min
          </SoftTypography>
        ) : null}
        <SoftButton
          mt={2}
          variant="text"
          color="dark"
          type="button"
          onClick={() => handleResendOtp()}
          disabled={resendEnable}
        >
          Resend Otp
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

VerifyOtp.propTypes = {
  handleVerifyOtp: PropTypes.func,
  mobileNo: PropTypes.string,
  resetForm: PropTypes.func,
  resendOtp: PropTypes.func,
};
