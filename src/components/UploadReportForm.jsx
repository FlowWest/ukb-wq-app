import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Input, TextArea, Button } from "semantic-ui-react"

const UploadReportForm = () => {
  const { control, handleSubmit } = useForm({
    title: "",
    location: "",
    authors: "",
    file: "",
  })
  const onSubmit = (data) => console.log("data", data)
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        name="file"
        control={control}
        render={({ field }) => (
          <Form.Input label="Upload File" type="file" {...field} />
        )}
      />
      <Button type="submit">Submit</Button>
      <Button type="button" negative>
        Cancel
      </Button>
    </Form>
  )
}

export default UploadReportForm
