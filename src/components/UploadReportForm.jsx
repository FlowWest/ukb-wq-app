import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button } from "semantic-ui-react"
import DataUploader from "./DataUploader"
import reportTypeDropdownOptions from "../helpers/reportTypeOptions"
import { uploadReportSchema } from "../helpers/validationSchemas"
import { yupResolver } from "@hookform/resolvers/yup"

const UploadReportForm = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadReportSchema),
    defaultValues: {
      title: "",
      location: "",
      authors: "",
      type: "",
      file: null,
    },
  })

  const handleFormSubmit = (data) => {
    console.log("data", data)
    // onClose()
  }
  const handleSelectChange = (event, option) => {
    setValue("type", option.value)
    clearErrors("type")
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              label="Title"
              {...field}
              className={errors.title ? "form-error-input" : ""}
            />
            {errors.title && (
              <p className="form-error-message">{errors.title.message}</p>
            )}
          </>
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              label="Location"
              {...field}
              className={errors.location ? "form-error-input" : ""}
            />
            {errors.location && (
              <p className="form-error-message">{errors.location.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="authors"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              label="Authors"
              {...field}
              className={errors.authors ? "form-error-input" : ""}
            />
            {errors.authors && (
              <p className="form-error-message">{errors.authors.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <>
            <Form.Select
              label="Report Type"
              {...field}
              options={reportTypeDropdownOptions}
              className={errors.type ? "form-error-input" : ""}
              onChange={handleSelectChange}
            />
            {errors.type && (
              <p className="form-error-message">{errors.type.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <>
            <DataUploader
              setValue={setValue}
              getValues={getValues}
              clearErrors={clearErrors}
              error={errors.file}
              {...field}
            />
            {errors.file && (
              <p className="form-error-message">{errors.file.message}</p>
            )}
          </>
        )}
      />
      <Button type="submit">Submit</Button>
      <Button type="button" negative onClick={onClose}>
        Cancel
      </Button>
    </Form>
  )
}

export default UploadReportForm
