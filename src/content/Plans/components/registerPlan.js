import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { registerPlanValidation } from "validation/planValidation";

const allPlanList = [
  { value: "prePaid", label: "Prepaid" },
  { value: "postPaid", label: "Postpaid" },
];

export default function RegisterPlan({ handleRegisterPlan, selectedPlanType }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(registerPlanValidation) });

  const onSubmit = (data, e) => {
    handleRegisterPlan(data, e);
  };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Register Plan
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Plan Name"
            {...register("planName")}
            error={!!errors.planName}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.planName?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftSelect
            options={allPlanList}
            key={selectedPlanType}
            handleChange={(val) => {
              setValue("planType", val.value, { shouldValidate: true });
            }}
            error={errors?.planType}
            placeholder="Select Plan Type"
          />
          <SoftTypography variant="overline" color="error">
            {errors?.planType?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Free Message Count"
            {...register("freeMessageCount")}
            error={!!errors.freeMessageCount}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.freeMessageCount?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Message count"
            {...register("messageCount")}
            error={!!errors.messageCount}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.messageCount?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Price"
            {...register("price")}
            error={!!errors.price}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.price?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Plan Validity (days)"
            {...register("planValidity")}
            error={!!errors.planValidity}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.planValidity?.message}
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

RegisterPlan.propTypes = {
  handleRegisterPlan: PropTypes.func,
  selectedPlanType: PropTypes.string,
};
