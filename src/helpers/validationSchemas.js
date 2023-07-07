import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const uploadReportSchema = yup
  .object()
  .shape({
    title: yup.string().label("Title").required().min(10).trim(),
    location: yup.string().label("Location").required().trim(),
    authors: yup.string().label("Authors").required().trim(),
    type: yup.string().label("Report Type").required(),
    file: yup.mixed().required("Please specify a file to upload"),
  })
  .required()
