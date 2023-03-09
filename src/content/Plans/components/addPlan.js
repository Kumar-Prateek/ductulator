import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { addPlanValidation } from "validation/planValidation";

const allPlanListsds = [
  { value: "prepaid", label: "Prepaid" },
  { value: "postpaid", label: "Postpaid" },
];

export default function AddPlan({ handleAddPlan, selectedPlanType, allPlanList }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(addPlanValidation) });

  const onSubmit = (data, e) => {
    handleAddPlan(data, e);
  };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Add Plan
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
            options={allPlanList.map((item) => ({
              ...item,
              label: item.planName,
            }))}
            key={selectedPlanType}
            handleChange={(val) => {
              setValue("planId", val.value, { shouldValidate: true });
            }}
            error={errors?.planId}
            placeholder="Select Plan Type"
          />
          <SoftTypography variant="overline" color="error">
            {errors?.planId?.message}
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

AddPlan.propTypes = {
  handleAddPlan: PropTypes.func,
  selectedPlanType: PropTypes.number,
  allPlanList: PropTypes.array,
};
