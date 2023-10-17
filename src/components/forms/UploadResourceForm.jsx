import React, { useCallback, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button, Checkbox, Grid } from "semantic-ui-react"
import DataUploader from "../DataUploader"
import resourceDropdownOptions from "../../helpers/resourceTypeOptions"
import { uploadResourceSchema } from "../../helpers/validationSchemas"
import { yupResolver } from "@hookform/resolvers/yup"
import * as AWS from "aws-sdk"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import DatePicker from "react-datepicker"
import { v4 as uuidv4 } from "uuid"
import "react-datepicker/dist/react-datepicker.css"
import DatePickerContainer from "../DatePickerContainer"

const UploadResourceForm = ({ onClose, report = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(uploadResourceSchema),
    defaultValues: !!report
      ? {
          date: report.date,
          location: report.location,
          type: report.type,
        }
      : {
          date: "",
          type: "",
          file: null,
        },
  })

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      AWS.config.update({ region: "us-west-1" })
      const docClient = new AWS.DynamoDB.DocumentClient()
      const tableName = "weekly_reports_metadata"

      const reader = new FileReader()
      reader.readAsArrayBuffer(data.file)
      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result

        const client = new S3Client({ ...AWS.config, region: "us-west-2" })
        const pdfCommand = new PutObjectCommand({
          Bucket: process.env.GATSBY_S3_BUCKET,
          Key: data.file.name,
          Body: binaryStr,
          ContentType: data.file.type,
          StorageClass: "STANDARD_IA",
          ACL: "public-read",
        })
        try {
          const response = await client.send(pdfCommand)
          console.log(response)

          const newWeeklyReport = {
            date: data.date,
            filename: data.file.name,
            type: data.type,
            weekly_report_uuid: uuidv4(),
          }
          const params = {
            TableName: tableName,
            Item: newWeeklyReport,
          }
          await docClient.put(params).promise()
        } catch (err) {
          console.error(err)
        } finally {
          setIsSubmitting(false)

          onClose()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectChange = (event, option) => {
    const fileValue = watch("file")
    if (option.value === "sonde" && fileValue?.type.includes("pdf")) {
      setValue("file", null)
    }
    if (option.value !== "sonde" && fileValue?.type.includes("csv")) {
      setValue("file", null)
    }

    setValue("type", option.value)
    clearErrors("type")
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      // className={"edit-report-form-container"}
      loading={isSubmitting}
    >
      <Grid columns={2}>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <>
                <Form.Select
                  label="Resource Type"
                  {...field}
                  options={resourceDropdownOptions}
                  className={errors.type ? "form-error-input" : ""}
                  onChange={handleSelectChange}
                />
                {errors.type && (
                  <p className="form-error-message">{errors.type.message}</p>
                )}
              </>
            )}
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <DatePicker
                  minDate={new Date(`1980-01-01T12:00`)}
                  maxDate={new Date()}
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(new Date(date))
                  }}
                  customInput={
                    <Form.Input
                      label="Date"
                      {...field}
                      className={error ? "form-error-input" : ""}
                    />
                  }
                />
                {errors.date && (
                  <p className="form-error-message form-error-message__datepicker">
                    {errors.date.message}
                  </p>
                )}
              </>
            )}
          />
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Controller
            name="file"
            control={control}
            render={({ field, formState }) => {
              const resourceType = watch("type")
              const accept = resourceType === "sonde" ? "csv" : "pdf"
              console.log("🚀 ~ UploadResourceForm ~ accept:", accept)

              return (
                <>
                  <DataUploader
                    {...field}
                    setValue={setValue}
                    getValues={getValues}
                    clearErrors={clearErrors}
                    error={errors.file}
                    accept={accept}
                  />
                </>
              )
            }}
          />
        </Grid.Column>

        <Grid.Column width={16}>
          <Button type="button" color="red" inverted onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" positive>
            Submit
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  )
}

export default UploadResourceForm
