import * as Yup from "yup";
import { phoneRegex } from "./regex";

export const messageRecordValidation = Yup.object().shape({
  mobileNo: Yup.string()
    .required("Please enter mobile number")
    .matches(phoneRegex, "Mobile number is not valid")
    .min(10, "Mobile number is too short"),
  tenantId: Yup.string().required("Please select template id"),
});
