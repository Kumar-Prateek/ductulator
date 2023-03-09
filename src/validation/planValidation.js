import * as Yup from "yup";
import { alphanumericRegex, numRegex } from "./regex";

export const registerPlanValidation = Yup.object().shape({
  planName: Yup.string()
    .required("Please enter plan name")
    .matches(alphanumericRegex, "Plan name is not valid")
    .min(1, "Plan name is too short")
    .max(100, "Plan name is too long"),
  planType: Yup.string().required("Please select plan type"),
  freeMessageCount: Yup.string()
    .required("Please provide free message count")
    .min(1, "Message count is too small")
    .max(5, "Message count is too large")
    .test("value", "Message count is not valid", (value) => {
      return value && (value === "-1" || numRegex.test(value));
    }),
  messageCount: Yup.string()
    .required("Please enter message count")
    .min(1, "Message count is too short")
    .max(5, "Message count is too long")
    .test("value", "Message count is not valid", (value) => {
      return value && (value === "-1" || numRegex.test(value));
    }),
  price: Yup.string()
    .required("Please enter price")
    .matches(numRegex, "Please enter a valid price")
    .min(1, "Price is too small")
    .max(15, "Price is too large"),
  planValidity: Yup.string()
    .required("Please provide plan validity")
    .matches(numRegex, "Please enter a valid plan validity")
    .max(5, "Plan validity is too large"),
});

export const addPlanValidation = Yup.object().shape({
  planId: Yup.string().required("Please select plan type"),
  planName: Yup.string()
    .required("Please enter plan name")
    .matches(alphanumericRegex, "Plan name is not valid")
    .min(1, "Plan name is too short")
    .max(100, "Plan name is too long"),
});
