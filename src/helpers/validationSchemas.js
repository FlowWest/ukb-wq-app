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
