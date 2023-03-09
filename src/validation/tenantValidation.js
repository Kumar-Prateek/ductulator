import * as Yup from "yup";
import {
  aadharRegex,
  alphanumericRegex,
  emailRegEx,
  gstRegex,
  nameRegex,
  panRegex,
  phoneRegex,
} from "./regex";

export const tenantValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter name")
    .matches(nameRegex, "Name is not valid")
    .min(3, "Name is too short")
    .max(30, "Name is too long"),
  mobileNo: Yup.string()
    .required("Please enter mobile number")
    .matches(phoneRegex, "Mobile number is not valid")
    .min(10, "Mobile number is too short")
    .max(10, "Mobile number is too long"),
  emailId: Yup.string().required("Please enter email").matches(emailRegEx, "Email is not valid"),
  companyName: Yup.string()
    .required("Please enter company name")
    .matches(nameRegex, "Company Name is not valid")
    .min(3, "Company name is too short")
    .max(30, "Company name is too long"),
  aadharNo: Yup.string()
    .required("Please enter aadhar number")
    .matches(aadharRegex, "Please enter a valid aadhar number"),
  panNo: Yup.string()
    .required("Please enter pan number")
    .matches(panRegex, "Please enter a valid pan number"),
  aadharImage: Yup.mixed()
    .required("Please provide a file")
    .test("fileSize", "The file should be less than 2 mb in size", (value) => {
      return value && value?.size / 1024 / 1024 <= 2;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg, .png, .PNG, .JPG, .JPEG",
      (value) => {
        return (
          value?.type === "image/jpeg" || value?.type === "image/jpg" || value?.type === "image/png"
        );
      }
    ),
  panImage: Yup.mixed()
    .required("Please provide a file")
    .test("fileSize", "The file should be less than 2 mb in size", (value) => {
      return value && value?.size / 1024 / 1024 <= 2;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg, .png, .PNG, .JPG, .JPEG",
      (value) => {
        return (
          value?.type === "image/jpeg" || value?.type === "image/jpg" || value?.type === "image/png"
        );
      }
    ),
  gstinNo: Yup.string()
    .required("Please enter gstin number")
    .matches(gstRegex, "Please enter a valid gstin number"),
  gstinImage: Yup.mixed()
    .test("file", "Please provide a gstin image", (value) => {
      return !!value;
    })
    .test("fileSize", "The file should be less than 2 mb in size", (value) => {
      if (!value) return false;
      return value && value?.size / 1024 / 1024 <= 2;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg, .png, .PNG, .JPG, .JPEG",
      (value) => {
        return (
          value?.type === "image/jpeg" || value?.type === "image/jpg" || value?.type === "image/png"
        );
      }
    ),
  accountType: Yup.string()
    .required("Please select a account type")
    .matches(alphanumericRegex, "Please provide a valid account type"),
  planType: Yup.mixed().when("accountType", (accountType) => {
    if (accountType && accountType[0]?.toLowerCase() === "prepaid") {
      return Yup.mixed().notRequired();
    } else {
      return Yup.mixed().required("Please select a plan type");
    }
  }),
  senderId: Yup.string()
    .required("Please provide sender")
    .matches(alphanumericRegex, "Please provide a valid sender"),
  entityId: Yup.string()
    .required("Please provide entitiy")
    .matches(alphanumericRegex, "Please provide a valid entity"),
  identifier: Yup.string()
    .required("Please provide identifier")
    .matches(alphanumericRegex, "Please provide a valid identifier"),
});
