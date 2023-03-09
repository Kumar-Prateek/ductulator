import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { manageRoleValidation } from "validation/roleValidation";

const renderCheckbox = (item, handlePageChange, initalState) => (
  <FormGroup>
    <FormControlLabel
      control={<Checkbox checked={item.allowed} onChange={handlePageChange} name={item.pageName} />}
      label={item.label}
    />
  </FormGroup>
);

export default function ManageRole({
  handleRoleSubmit,
  role,
  manageRef,
  pages,
  setPages,
  handleResetForm,
  roleData,
  initalState,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: role,
    },
    mode: "onChange",
    resolver: yupResolver(manageRoleValidation),
  });

  const onSubmit = (data, e) => {
    handleRoleSubmit(data, e);
  };

  const handlePageChange = (e, val) => {
    const p = [...pages];
    const index = p.map((item) => item.pageName).indexOf(e.target.name);
    if (index > -1) {
      p[index].allowed = val;
    }
    setValue("pages", [...p], { shouldValidate: true });
    setPages([...p]);
  };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          {roleData ? "Update Role" : "Add Role"}
        </SoftTypography>
      </SoftBox>
      <SoftBox ref={manageRef} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Role Name"
            {...register("role")}
            onChange={() => null}
            error={!!errors.role}
            disabled
          />
          <SoftTypography variant="overline" color="error">
            {errors?.role?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox my={1}>
          <SoftTypography variant="button" fontWeight="medium">
            Pages
          </SoftTypography>
          <SoftBox m={3}>
            <Grid container spacing={1}>
              {pages?.map((item) => (
                <Grid item xs={12} lg={6} key={item.pageName}>
                  {renderCheckbox(item, handlePageChange, initalState)}
                </Grid>
              ))}
            </Grid>
          </SoftBox>
          <SoftTypography variant="overline" color="error">
            {errors?.pages?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1} display="flex" justifyContent="space-around" alignItems="center">
          <SoftButton variant="gradient" color="secondary" type="button" onClick={handleResetForm}>
            Cancel
          </SoftButton>
          <SoftButton variant="gradient" color="info" type="submit">
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

ManageRole.propTypes = {
  handleRoleSubmit: PropTypes.func,
  role: PropTypes.string,
  manageRef: PropTypes.any,
  pages: PropTypes.array,
  setPages: PropTypes.func,
  handleResetForm: PropTypes.func,
  roleData: PropTypes.any,
  initalState: PropTypes.array,
};
