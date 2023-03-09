import { yupResolver } from "@hookform/resolvers/yup";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ipValidation } from "validation/configValidation";

export default function AddIp({ handleAddIp }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(ipValidation) });

  const onSubmit = (data, e) => {
    handleAddIp(data, e);
  };
  return (
    <SoftBox mb={2}>
      <SoftBox my={2}>
        <SoftTypography variant="button" fontWeight="medium">
          Add Ip
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftInput type="text" placeholder="IP Address" {...register("ip")} error={!!errors.ip} />

          <SoftTypography variant="overline" color="error">
            {errors?.ip?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1} display="grid" justifyContent="center" alignItems="center">
          <SoftButton variant="gradient" color="info" type="submit">
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

AddIp.propTypes = {
  handleAddIp: PropTypes.func,
};
