import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { setPriorityValidation } from "validation/serviceProviderValidation";

export default function SetPriority({
  allProviderList,
  setPriority,
  setSelectedProviderId,
  selectedProviderId,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(setPriorityValidation) });

  const onSubmit = (data, e) => {
    setPriority(data, e);
  };
  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Set Priority
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftSelect
            options={allProviderList.map((item) => ({
              ...item,
              label: item.name,
              value: item.providerId,
            }))}
            key={selectedProviderId}
            handleChange={(val) => {
              setValue("providerId", val.providerId, { shouldValidate: true });
            }}
            error={errors?.providerId}
            placeholder="Select Provider"
          />
          <SoftTypography variant="overline" color="error">
            {errors?.providerId?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="number"
            placeholder="Provider Priority"
            {...register("priority")}
            error={!!errors.priority}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.priority?.message}
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

SetPriority.propTypes = {
  allProviderList: PropTypes.array,
  setPriority: PropTypes.func,
  setSelectedProviderId: PropTypes.func,
  selectedProviderId: PropTypes.string,
};
