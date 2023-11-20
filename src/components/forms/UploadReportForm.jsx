import React, { useCallback, useState, useContext, useEffect } from "react"
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
import { UserContext } from "../../../gatsby-browser"
import { getAuthorsDropdownOptions } from "../../helpers/authorsDropdownOptions"
import { getAllAuthors, getAllReports } from "../../hooks/useReportModalContext"

const UploadReportForm = ({ state, dispatch, report = null }) => {
  const { user } = useContext(UserContext) || {}
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

  const [authorsDropdownOptions, setAuthorsDropdownOptions] = useState([])
  const [userAddedAuthors, setUserAddedAuthors] = useState([])

  useEffect(() => {
    const authors = state.allAuthors
    const options = getAuthorsDropdownOptions(authors)

    setAuthorsDropdownOptions(options)
  }, [])

  const handleAuthorAddition = (e, { value }) => {
    setAuthorsDropdownOptions((prevOptions) => [
      { key: value, text: value, value },
      ...prevOptions,
    ])
    setUserAddedAuthors((prevAdded) => [...prevAdded, value])
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(!!report ? editReportSchema : uploadReportSchema),
    defaultValues: !!report
      ? {
          title: report.title,
          year: report.year,
          endYear: report.endyear === "NA" ? null : report.endyear,
          addEndYear: !(report.endyear === "NA"),
          location: report.location,
          authors: report.authors_array,
          type: report.type,
        }
      : {
          title: "",
          year: "",
          endYear: null,
          addEndYear: false,
          location: "",
          authors: [],
          type: "",
          file: null,
        },
  })
  const authorsValue = watch("authors")

  const editForm = !!report

  const handleFormModalClose = () => dispatch({ type: "CLOSE_FORM_MODAL" })

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (user && Object.keys(user).length) {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [`cognito-idp.us-west-1.amazonaws.com/${process.env.GATSBY_COGNITO_USER_POOL_ID}`]:
              user.signInUserSession.getIdToken().getJwtToken(),
          },
        })
        //call refresh method in order to authenticate user and get new temp credentials
        AWS.config.credentials.refresh(async (error) => {
          if (error) {
            console.error(error)
          } else {
            AWS.config.update({ region: "us-west-1" })
            const docClient = new AWS.DynamoDB.DocumentClient()
            const tableName = "reports_metadata"
            ///
            //Logic for adding new authors to the authors table in DynamoDB

            const authorsToAdd = userAddedAuthors.reduce((arr, cur) => {
              if (data.authors.includes(cur)) {
                arr.push({
                  PutRequest: {
                    Item: { author_name: cur, author_uuid: uuidv4() },
                  },
                })
              }
              return arr
            }, [])

            if (authorsToAdd.length) {
              const params = {
                RequestItems: {
                  authors: authorsToAdd,
                },
              }
              await docClient.batchWrite(params).promise()
            }

            if (editForm) {
              try {
                const params = {
                  TableName: tableName,
                  Key: { report_uuid: report.report_uuid },
                  UpdateExpression:
                    "set #title = :title, #year = :year, #endyear = :endyear, #location = :location, #authors_array = :authors_array, #type = :type",
                  ExpressionAttributeNames: {
                    "#title": "title",
                    "#year": "year",
                    "#endyear": "endyear",
                    "#location": "location",
                    "#authors_array": "authors_array",
                    "#type": "type",
                  },
                  ExpressionAttributeValues: {
                    ":title": data.title,
                    ":year": data.year,
                    ":endyear": data.endYear || "NA",
                    ":location": data.location || "NA",
                    ":authors_array": authorsValue,
                    ":type": data.type,
                  },
                }
                await docClient.update(params).promise()
              } catch (error) {
                console.log("🚀 ~ handleFormSubmit ~ error:", error)
              } finally {
                setIsSubmitting(false)
                // await getAllReports()

                const reports = await getAllReports()
                const authors = await getAllAuthors()
                dispatch({
                  type: "STARTUP",
                  payload: { reports, authors },
                })
                handleFormModalClose()
                return
              }
            }

            const reader = new FileReader()
            reader.readAsArrayBuffer(data.file)
            reader.onabort = () => console.log("file reading was aborted")
            reader.onerror = () => console.log("file reading has failed")
            reader.onload = async () => {
              // Do whatever you want with the file contents
              const binaryStr = reader.result

              const client = new S3Client({
                ...AWS.config,
                region: "us-west-2",
                correctClockSkew: true,
              })
              const pdfCommand = new PutObjectCommand({
                Bucket: process.env.GATSBY_S3_BUCKET,
                Key: data.file.name,
                Body: binaryStr,
                ContentType: "application/pdf",
                StorageClass: "STANDARD_IA",
                ACL: "public-read",
              })
              try {
                const response = await client.send(pdfCommand)
                console.log(response)

                const newReport = {
                  title: data.title,
                  year: data.year,
                  endyear: data.endYear || "NA",
                  filename: data.file.name,
                  location: data.location || "NA",
                  authors_array: authorsValue,
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
                // await getAllReports()
                const reports = await getAllReports()
                const authors = await getAllAuthors()
                dispatch({
                  type: "STARTUP",
                  payload: { reports, authors },
                })
                handleFormModalClose()
              }
            }
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAuthorsChange = (event, { value: authorsValue }) => {
    setValue("authors", authorsValue)
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
            <Form.Dropdown
              label="Authors"
              value={field.value}
              fluid
              placeholder="Select or enter the author(s) of this report"
              allowAdditions
              selection
              search
              clearable
              multiple
              className={
                errors.authors ? "form-error-input" : "filter-input-field"
              }
              onAddItem={handleAuthorAddition}
              onChange={handleAuthorsChange}
              options={authorsDropdownOptions}
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
      <Button type="button" color="red" inverted onClick={handleFormModalClose}>
        Cancel
      </Button>
      <Button type="submit" positive>
        Submit
      </Button>
    </Form>
  )
}

export default UploadReportForm
