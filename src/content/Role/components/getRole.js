import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { getRoleValidation } from "validation/roleValidation";

export default function GetRole({ handleGetRoleData, setRole, roleRef }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(getRoleValidation) });

  const onSubmit = (data, e) => {
    handleGetRoleData(data, e);
  };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Search Role
        </SoftTypography>
      </SoftBox>
      <SoftBox ref={roleRef} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Role Name"
            {...register("role")}
            onChange={(e) => {
              setValue("role", e.target.value, { shouldValidate: true });
              setRole(e.target.value);
            }}
            error={!!errors.role}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.role?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1} display="grid" justifyContent="center" alignItems="center">
          <SoftButton variant="gradient" color="info" type="submit">
            Search
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

GetRole.propTypes = {
  handleGetRoleData: PropTypes.func,
  setRole: PropTypes.func,
  roleRef: PropTypes.any,
};
