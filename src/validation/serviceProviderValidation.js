import * as Yup from "yup";
import { alphanumericRegex, percentRegex, urlRegex } from "./regex";

export const registerProviderValidation = Yup.object().shape({
  url: Yup.string()
    .required("Please enter provider url")
    .matches(urlRegex, "Provider url is not valid"),
  name: Yup.string()
    .required("Please enter Provider Name")
    .matches(alphanumericRegex, "Provider Name is not valid")
    .min(3, "Provider Name is too short")
    .max(30, "Provider Name is too long"),
  percentage: Yup.string()
    .required("Please enter provider percentage")
    .matches(percentRegex, "Provider percentage is not valid"),
});

export const setPriorityValidation = Yup.object().shape({
  providerId: Yup.string().required("Please select provider"),
  priority: Yup.string()
    .required("Please enter provider priority")
    .matches(percentRegex, "Provider priority is not valid"),
});

export const addProviderValidation = Yup.object().shape({
  userId: Yup.string().required("Please select user"),
  providers: Yup.array()
    .of(
      Yup.object().shape({
        providerId: Yup.string().required("Please select provider"),
        priority: Yup.string().matches(percentRegex, "Provider priority is not valid"),
        name: Yup.string()
          .required("Please enter Provider Name")
          .matches(alphanumericRegex, "Provider Name is not valid")
          .min(3, "Provider Name is too short")
          .max(30, "Provider Name is too long"),
      })
    )
    .min(1, "Please select alteast one Page")
    .required("Please select alteast one Page"),
});
