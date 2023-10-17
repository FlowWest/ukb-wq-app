import React, { useCallback, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button, Checkbox } from "semantic-ui-react"
import DataUploader from "../DataUploader"
import reportTypeDropdownOptions from "../../helpers/reportTypeOptions"
import {
  uploadReportSchema,
  editReportSchema,
} from "../../helpers/validationSchemas"
import { yupResolver } from "@hookform/resolvers/yup"
import * as AWS from "aws-sdk"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import DatePicker from "react-datepicker"
import { v4 as uuidv4 } from "uuid"
import "react-datepicker/dist/react-datepicker.css"
import DatePickerContainer from "../DatePickerContainer"

const UploadReportForm = ({
  onClose,
  allReports,
  getAllReports,
  report = null,
}) => {
  const [showEndYear, setShowEndYear] = useState(
    report?.endyear.length === 4 || false
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = useCallback((year) => {
    const date = year ? new Date(`01-01-${year}`) : ""
    return date
  }, [])

  const parseYear = useCallback((date) => {
    const dateString = new Date(date).toDateString()
    const year = dateString.split(" ").at(3)
    return year
  }, [])

  const handleCheckboxToggle = useCallback((checked) => {
    setShowEndYear(checked)
    setValue("addEndYear", checked)
    if (!checked) setValue("endYear", null)
  }, [])

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(!!report ? editReportSchema : uploadReportSchema),
    defaultValues: !!report
      ? {
          title: report.title,
          year: report.year,
          endYear: report.endyear === "NA" ? null : report.endyear,
          addEndYear: !(report.endyear === "NA"),
          location: report.location,
          authors: report.authors,
          type: report.type,
        }
      : {
          title: "",
          year: "",
          endYear: null,
          addEndYear: false,
          location: "",
          authors: "",
          type: "",
          file: null,
        },
  })

  const editForm = !!report

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      AWS.config.update({ region: "us-west-1" })
      const docClient = new AWS.DynamoDB.DocumentClient()
      const tableName = "reports_metadata"

      if (editForm) {
        try {
          const params = {
            TableName: tableName,
            Key: { report_uuid: report.report_uuid },
            UpdateExpression:
              "set #title = :title, #year = :year, #endyear = :endyear, #location = :location, #authors = :authors, #type = :type",
            ExpressionAttributeNames: {
              "#title": "title",
              "#year": "year",
              "#endyear": "endyear",
              "#location": "location",
              "#authors": "authors",
              "#type": "type",
            },
            ExpressionAttributeValues: {
              ":title": data.title,
              ":year": data.year,
              ":endyear": data.endYear || "NA",
              ":location": data.location || "NA",
              ":authors": data.authors,
              ":type": data.type,
            },
          }
          await docClient.update(params).promise()
        } catch (error) {
          console.log("🚀 ~ handleFormSubmit ~ error:", error)
        } finally {
          setIsSubmitting(false)
          await getAllReports()
          onClose()
        }
      }

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
          ContentType: "application/pdf",
          StorageClass: "STANDARD_IA",
          ACL: "public-read",
        })
        console.log("onload")
        try {
          const response = await client.send(pdfCommand)
          console.log(response)

          const newReport = {
            title: data.title,
            year: data.year,
            endyear: data.endYear || "NA",
            filename: data.file.name,
            location: data.location || "NA",
            authors: data.authors,
            type: data.type,
            active: "TRUE",
            report_uuid: uuidv4(),
          }
          const params = {
            TableName: tableName,
            Item: newReport,
          }
          await docClient.put(params).promise()
        } catch (err) {
          console.error(err)
        } finally {
          setIsSubmitting(false)
          await getAllReports()
          onClose()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectChange = (event, option) => {
    setValue("type", option.value)
    clearErrors("type")
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={editForm ? "edit-report-form-container" : ""}
      loading={isSubmitting}
    >
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
        name="year"
        control={control}
        render={({ field }) => (
          <>
            <DatePicker
              calendarContainer={DatePickerContainer}
              selected={formatDate(getValues("year"))}
              onChange={(date) => {
                clearErrors("year")
                setValue("year", parseYear(date))
              }}
              showYearPicker
              maxDate={new Date(`01-01-${new Date().getFullYear()}`)}
              minDate={new Date(`01-01-1955`)}
              dateFormat="yyyy"
              customInput={
                <Form.Input
                  label="Year"
                  {...field}
                  className={errors.year ? "form-error-input" : ""}
                />
              }
            />

            {errors.year && (
              <p className="form-error-message form-error-message__datepicker">
                {errors.year.message}
              </p>
            )}
          </>
        )}
      />
      {showEndYear && (
        <Controller
          name="endYear"
          control={control}
          render={({ field }) => (
            <>
              <DatePicker
                calendarContainer={DatePickerContainer}
                selected={formatDate(getValues("endYear"))}
                onChange={(date) => {
                  clearErrors("endYear")
                  setValue("endYear", parseYear(date))
                }}
                showYearPicker
                maxDate={new Date(`01-01-${new Date().getFullYear()}`)}
                minDate={new Date(`01-01-1955`)}
                dateFormat="yyyy"
                customInput={
                  <Form.Input
                    label="End Year"
                    {...field}
                    className={errors.endYear ? "form-error-input" : ""}
                  />
                }
              />

              {errors.endYear && (
                <p className="form-error-message form-error-message__datepicker">
                  {errors.endYear.message}
                </p>
              )}
            </>
          )}
        />
      )}
      <Checkbox
        className="checkbox-field"
        label="Add End Year"
        checked={showEndYear}
        style={{ marginTop: "1rem" }}
        onChange={(e, { checked }) => handleCheckboxToggle(checked)}
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
              label="Authors (Commas can be used to separate multiple authors)"
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
      {!editForm && (
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
                accept="pdf"
                {...field}
              />
            </>
          )}
        />
      )}
      <Button type="button" color="red" inverted onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" positive>
        Submit
      </Button>
    </Form>
  )
}

export default UploadReportForm