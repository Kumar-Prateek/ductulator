import * as Yup from "yup";

export const templateValidation = Yup.object().shape({
  templateId: Yup.string().required("Please select template id"),
  senderId: Yup.string().required("Please select sender id"),
  templateMessage: Yup.string()
    .required("Please enter message")
    .min(5, "Message is too short")
    .max(200, "Message is too long"),
});
