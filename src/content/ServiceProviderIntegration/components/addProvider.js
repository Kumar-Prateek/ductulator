import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { addProviderValidation } from "validation/serviceProviderValidation";

export default function AddProvider({
  allUserList,
  selectedUserId,
  allProviderList,
  selectedProviderId,
  handleAddProvider,
  provider,
  setProviders,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(addProviderValidation) });

  const onSubmit = (data, e) => {
    handleAddProvider(data, e);
  };

  // const handleChangeProvider = (name, val) => {
  //   const index = provider.map((item) => item.providerId).indexOf(val._id);
  //   if (index === -1) {
  //     const d = { providerId: val._id, priority: val.percentage, name: val.name };
  //     if (provider?.length === 1 && provider[0].providerId !== "_") {
  //       setProviders[d];
  //     } else {
  //       setProviders([...provider, d]);
  //     }
  //   }
  // };

  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Add Provider
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <SoftSelect
            options={allUserList.map((item) => ({
              ...item,
              label: item.name,
              value: item._id,
            }))}
            key={selectedUserId}
            handleChange={(val) => {
              setValue("userId", val._id, { shouldValidate: true });
            }}
            error={errors?.userId}
            placeholder="Select User"
          />
          <SoftTypography variant="overline" color="error">
            {errors?.userId?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftSelect
            options={allProviderList.map((i) => ({
              ...i,
              label: i.name,
            }))}
            key={selectedProviderId}
            handleChange={(val) => {
              setValue(
                "providers",
                [{ providerId: val._id, priority: val.percentage, name: val.name }],
                { shouldValidate: true }
              );
            }}
            error={errors?.providers}
            placeholder="Select Provider"
          />
          <SoftTypography variant="overline" color="error">
            {errors?.providers?.message}
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

AddProvider.propTypes = {
  allUserList: PropTypes.array,
  selectedUserId: PropTypes.array,
  allProviderList: PropTypes.array,
  selectedProviderId: PropTypes.number,
  handleAddProvider: PropTypes.func,
  provider: PropTypes.string,
  setProviders: PropTypes.func,
};
