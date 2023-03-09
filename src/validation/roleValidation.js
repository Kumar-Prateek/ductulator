import * as Yup from "yup";

export const manageRoleValidation = Yup.object().shape({
  role: Yup.string().required("Please select plan type"),
  pages: Yup.array()
    .of(
      Yup.object().shape({
        pageName: Yup.string(),
        allowed: Yup.boolean(),
        label: Yup.string(),
      })
    )
    .min(1, "Please select alteast one Page")
    .required("Please select alteast one Page"),
});

export const getRoleValidation = Yup.object().shape({
  role: Yup.string().required("Please select plan type"),
});
