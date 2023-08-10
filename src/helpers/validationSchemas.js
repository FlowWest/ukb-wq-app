import * as yup from "yup"

export const uploadReportSchema = yup
  .object()
  .shape({
    title: yup.string().label("Title").required().min(10).trim(),
    year: yup.string().label("Year").required(),
    addEndYear: yup.boolean(),
    endYear: yup
      .string()
      .label("End Year")
      .nullable()
      .when("addEndYear", {
        is: true,
        then: (schema) => schema.required(),
      })
      .test("greater than", "End year must be greater than Year", function () {
        const { year, endYear } = this.parent
        return +endYear > +year
      }),
    location: yup.string().label("Location").required().trim(),
    authors: yup.string().label("Authors").required().trim(),
    type: yup.string().label("Report Type").required(),
    file: yup.mixed().required("Please specify a file to upload"),
  })
  .required()

export const editReportSchema = yup
  .object()
  .shape({
    title: yup.string().label("Title").required().min(10).trim(),
    year: yup.string().label("Year").required(),
    addEndYear: yup.boolean(),
    endYear: yup
      .string()
      .label("End Year")
      .nullable()
      .when("addEndYear", {
        is: true,
        then: (schema) => schema.required(),
      }),
    location: yup.string().label("Location").required().trim(),
    authors: yup.string().label("Authors").required().trim(),
    type: yup.string().label("Report Type").required(),
  })
  .required()

export const loginFormSchema = yup.object().shape({
  username: yup.string().label("Username").email().required(),
  password: yup.string().label("Password").required(),
})

export const requestPasswordResetSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  // verificationCode: yup.string().required(),
})
export const passwordResetVerificationSchema = yup.object().shape({
  verificationCode: yup.string().required().min(6).label("Verification Code"),
})
export const setNewPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(8).required().label("New Password"),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match"),
})
