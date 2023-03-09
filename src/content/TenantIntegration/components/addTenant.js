import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShowSwalMsg } from "utility/swal";

import { tenantValidation } from "validation/tenantValidation";

export default function AddTenant({
  handleAddTenant,
  allAccountTypeList,
  selectedAccountType,
  allPlanType,
  selectedPlanType,
  setSelectedPlanType,
  setAadharImage,
  setPanImage,
  setGstinImage,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(tenantValidation) });

  const [aadharImgName, setAadharImgName] = useState("");
  const [panImgName, setPanImgName] = useState("");
  const [gstImgName, setGstImgName] = useState("");

  const onSubmit = (data, e) => {
    handleAddTenant(data, e);
  };

  const handleFileChange = (e, name) => {
    if (e.target?.files?.length > 0) {
      const file = e.target.files[0];
      const imgName = file.name;
      setValue(name, file, { shouldValidate: true });
      if (name === "aadharImage") {
        setAadharImgName(imgName);
        setAadharImage(file);
      } else if (name === "panImage") {
        setPanImgName(imgName);
        setPanImage(file);
      } else if (name === "gstinImage") {
        setGstImgName(imgName);
        setGstinImage(file);
      }
    } else {
      ShowSwalMsg("error", "Please select a file");
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={1}>
        <SoftTypography variant="h5" fontWeight="medium">
          Add Tenant
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                error={!!errors.fullName}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.fullName?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="email"
                placeholder="Email Id"
                {...register("emailId")}
                error={!!errors.emailId}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.emailId?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Company Name"
                {...register("companyName")}
                error={!!errors.companyName}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.companyName?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
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
          {/* -----------additional------------ */}

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftTypography variant="button">
                Aadhar Image {aadharImgName ? `: ${aadharImgName}` : ""}
              </SoftTypography>
              <SoftInput
                type="file"
                placeholder="Aadhar Image"
                onChange={(e) => {
                  handleFileChange(e, "aadharImage");
                }}
                error={!!errors.aadharImage}
                files={[watch("aadharImage")]}
                accept="image/*"
              />
              <SoftTypography variant="overline" color="error">
                {errors?.aadharImage?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftTypography variant="button">
                Pan Image {panImgName ? `: ${panImgName}` : ""}
              </SoftTypography>
              <SoftInput
                type="file"
                placeholder="Pan Image"
                onChange={(e) => handleFileChange(e, "panImage")}
                error={!!errors.panImage}
                accept="image/*"
              />
              <SoftTypography variant="overline" color="error">
                {errors?.panImage?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftTypography variant="button">
                GSTIN Image {gstImgName ? `: ${gstImgName}` : ""}
              </SoftTypography>
              <SoftInput
                type="file"
                placeholder="GSTIN Image"
                onChange={(e) => handleFileChange(e, "gstinImage")}
                error={!!errors.gstinImage}
                accept="image/*"
              />
              <SoftTypography variant="overline" color="error">
                {errors?.gstinImage?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}></Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Aadhar number"
                {...register("aadharNo")}
                error={!!errors.aadharNo}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.aadharNo?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Pan Number"
                {...register("panNo")}
                error={!!errors.panNo}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.panNo?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="GSTIN Number"
                {...register("gstinNo")}
                error={!!errors.gstinNo}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.gstinNo?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftSelect
                options={allAccountTypeList}
                key={selectedAccountType}
                handleChange={(val) => {
                  setValue("accountType", val.value, { shouldValidate: true });
                  if (val.value.toLowerCase() === "prepaid") {
                    setValue("planType", "", { shouldValidate: true });
                    setSelectedPlanType(selectedPlanType + 1);
                  }
                }}
                error={errors?.accountType}
                placeholder="Select Account Type"
              />
              <SoftTypography variant="overline" color="error">
                {errors?.accountType?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftSelect
                options={allPlanType.map((item) => ({
                  ...item,
                  label: item.planName,
                  value: item._id,
                }))}
                key={selectedPlanType}
                handleChange={(val) => {
                  setValue("planType", val, { shouldValidate: true });
                }}
                error={errors?.planType}
                placeholder="Select Plan Type"
              />
              <SoftTypography variant="overline" color="error">
                {errors?.planType?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Sender Id"
                {...register("senderId")}
                error={!!errors.senderId}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.senderId?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Entity Id"
                {...register("entityId")}
                error={!!errors.entityId}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.entityId?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>

          <Grid item xs={12} lg={6}>
            <SoftBox mb={1}>
              <SoftInput
                type="text"
                placeholder="Identifier"
                {...register("identifier")}
                error={!!errors.identifier}
              />
              <SoftTypography variant="overline" color="error">
                {errors?.identifier?.message}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
        {/* -----------additional------------ */}
        <SoftBox mt={4} mb={1} display="grid" justifyContent="center" alignItems="center">
          <SoftButton variant="gradient" color="info" type="submit">
            Submit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

AddTenant.propTypes = {
  handleAddTenant: PropTypes.func,
  allAccountTypeList: PropTypes.array,
  selectedAccountType: PropTypes.number,
  allPlanType: PropTypes.array,
  selectedPlanType: PropTypes.number,
  setSelectedPlanType: PropTypes.func,
  setAadharImage: PropTypes.func,
  setPanImage: PropTypes.func,
  setGstinImage: PropTypes.func,
};
