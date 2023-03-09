import * as Yup from "yup";
import { phoneRegex } from "./regex";

export const mobileNoValidation = Yup.object().shape({
  mobileNo: Yup.string()
    .required("Please enter mobile number")
    .matches(phoneRegex, "Mobile number is not valid")
    .min(10, "Mobile number is too short")
    .max(10, "Mobile number is too long"),
});

export const otpValidation = Yup.object().shape({
  mobileNo: Yup.string()
    .required("Please enter Mobile Number")
    .matches(phoneRegex, "Mobile number is not valid")
    .min(10, "Mobile number is too short")
    .max(10, "Mobile number is too long"),
  otp: Yup.string()
    .required("Please enter Otp")
    .min(2, "Otp is too short")
    .max(10, "Otp is too long"),
});
