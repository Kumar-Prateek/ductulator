import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import TenantId from "examples/TenantId";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { templateValidation } from "validation/tempalteValidation";

export default function AddTemplate({
  handleAddTemplate,
  allTemplateList,
  allSenderList,
  selectedTemplateId,
  selectedSenderId,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(templateValidation) });

  const onSubmit = (data, e) => {
    handleAddTemplate(data, e);
  };
  return (
    <Card sx={{ p: 2 }}>
      <SoftBox mb={2}>
        <SoftTypography variant="h5" fontWeight="medium">
          Add Template
        </SoftTypography>
      </SoftBox>
      <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <SoftBox mb={2}>
          <TenantId setValue={setValue} errors={errors} selectedId={selectedTemplateId} />

          <SoftTypography variant="overline" color="error">
            {errors?.templateId?.message}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
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
        <SoftBox mb={2}>
          <SoftInput
            placeholder="Enter Template Message..."
            {...register("templateMessage")}
            error={!!errors.templateMessage}
            multiline
            rows={7}
          />
          <SoftTypography variant="overline" color="error">
            {errors?.templateMessage?.message}
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

AddTemplate.propTypes = {
  handleAddTemplate: PropTypes.func,
  allTemplateList: PropTypes.array,
  allSenderList: PropTypes.array,
  selectedTemplateId: PropTypes.string,
  selectedSenderId: PropTypes.string,
};
