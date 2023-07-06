import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button } from "semantic-ui-react"
import DataUploader from "./DataUploader"
import reportTypeDropdownOptions from "../helpers/reportTypeOptions"

const UploadReportForm = ({ onClose }) => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    title: "",
    location: "",
    authors: "",
    type: "",
    file: null,
  })

  const handleFormSubmit = (data) => {
    console.log("data", data)
    // onClose()
  }
  const handleSelectChange = (event, option) => {
    setValue("type", option.value)
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <Form.Input label="Title" {...field} />}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => <Form.Input label="Location" {...field} />}
      />
      <Controller
        name="authors"
        control={control}
        render={({ field }) => <Form.Input label="Authors" {...field} />}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Form.Select
            label="Report Type"
            {...field}
            options={reportTypeDropdownOptions}
            onChange={handleSelectChange}
          />
        )}
      />
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <DataUploader setValue={setValue} getValues={getValues} {...field} />
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
