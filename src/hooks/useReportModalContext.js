import * as AWS from "aws-sdk"
import { get, orderBy } from "lodash"
import React, { createContext, useEffect, useReducer } from "react"
import { Modal } from "semantic-ui-react"
import UploadReportForm from "../components/forms/UploadReportForm"
import { formatTextCasing } from "../helpers/utils"
import { filter, escapeRegExp } from "lodash"

export const ReportModalContext = createContext({
  state: {},
  dispatch: () => {},
})

const reportModalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_FORM_MODAL":
      return { ...state, formModalOpen: true }
    case "CLOSE_FORM_MODAL":
      return { ...state, selectedReport: null, formModalOpen: false }
    case "EDIT_REPORT":
      console.log("new state", {
        ...state,
        selectedReport: action.payload.selectedReport,
        formModalOpen: true,
      })
      return {
        ...state,
        selectedReport: action.payload.selectedReport,
        formModalOpen: true,
      }
    case "FILTER_REPORTS":
      let updatedFilteredReports = [...state.allReports]

      switch (action.payload.selectedReportVisibilityFilter) {
        case "all":
          updatedFilteredReports = state.allReports
          break
        case "active":
          updatedFilteredReports = updatedFilteredReports.filter(
            (report) => report.active === "TRUE"
          )
          break
        case "hidden":
          updatedFilteredReports = updatedFilteredReports.filter(
            (report) => report.active === "FALSE"
          )
          break
      }

      if (action.payload.currentSearchFilterString) {
        const re = new RegExp(
          escapeRegExp(action.payload.currentSearchFilterString),
          "i"
        )

        const isMatch = (result) => re.test(`${result.title} ${result.authors}`)

        updatedFilteredReports = filter(updatedFilteredReports, isMatch)
      }

      if (action.payload?.currentReportTypeFilters?.length > 0) {
        updatedFilteredReports = updatedFilteredReports?.filter((report) =>
          action.payload?.currentReportTypeFilters?.includes(report.type)
        )
      }
      return {
        ...state,
        selectedReportVisibilityFilter:
          action.payload.selectedReportVisibilityFilter,
        currentSearchFilterString: action.payload.currentSearchFilterString,
        currentReportTypeFilters: action.payload.currentReportTypeFilters,
        filteredReports: updatedFilteredReports,
      }
    // case "GET_ALL_REPORTS":
    //   console.log("test from get all reports case")
    //   return { ...state, allReports: action.payload.reports }
    // case "GET_ALL_AUTHORS":
    //   console.log("test test from get all authors case")
    //   return { ...state, allAuthors: action.payload.authors }
    case "TOGGLE_REPORT_VISIBILITY":
      return toggleReportVisibility(action.payload.selectedReport)
    case "STARTUP":
      // const allReports = await getAllReports()
      // console.log("🚀 ~ reportModalReducer ~ allReports:", allReports)
      // const allAuthors = await getAllAuthors()
      // console.log("🚀 ~ reportModalReducer ~ allAuthors:", allAuthors)

      const uniqueReportTypes = [
        ...new Set(action.payload.reports?.map((item) => item.type)),
      ].sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })

      const reportTypesArray = uniqueReportTypes.map((reportType, index) => ({
        key: index,
        text: formatTextCasing(reportType),
        value: reportType,
      }))

      return {
        ...state,
        allAuthors: action.payload.authors,
        allReports: action.payload.reports,
        filteredReports: action.payload.reports.sort(
          (a, b) => +b.year - +a.year
        ),
        reportTypeOptions: reportTypesArray,
      }
    default:
      return
  }
}

export const ReportModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportModalReducer, {
    formModalOpen: false,
    selectedReport: null,
    allAuthors: [],
    allReports: [],
    filteredReports: [],
    reportTypeOptions: [],
  })

  useEffect(() => {
    ;(async () => {
      try {
        const reports = await getAllReports()
        const authors = await getAllAuthors()
        dispatch({ type: "STARTUP", payload: { reports, authors } })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <ReportModalContext.Provider value={{ state, dispatch }}>
      {children}
      <Modal
        closeIcon
        open={state?.formModalOpen}
        onOpen={() => dispatch({ type: "OPEN_FORM_MODAL" })}
        onClose={() => dispatch({ type: "CLOSE_FORM_MODAL" })}
      >
        <Modal.Header>Upload Report</Modal.Header>
        <Modal.Content>
          <UploadReportForm
            state={state}
            dispatch={dispatch}
            report={state?.selectedReport}
          />
        </Modal.Content>
      </Modal>
    </ReportModalContext.Provider>
  )
}

const getCognitoIdSync = () => {
  return new Promise((resolve, reject) => {
    const cognitoidentity = new AWS.CognitoIdentity({
      region: "us-west-1",
    })
    const params = {
      IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
    }

    cognitoidentity.getId(params, async function (err, data) {
      if (err) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function getAllReports() {
  try {
    let reportsData = []

    // call forgotPassword on cognitoUser
    const { IdentityId } = await getCognitoIdSync()

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
      IdentityId,
    })
    AWS.config.region = "us-west-1"

    // Create a DynamoDB DocumentClient
    const docClient = new AWS.DynamoDB.DocumentClient()

    // Specify the table name
    const tableName = "reports_metadata"
    const params = {
      TableName: tableName,
    }
    const result = await docClient.scan(params).promise()
    const items = result.Items

    const sortedItems = orderBy(items, ["year"], ["desc"])

    // setAllReports(reportsData)
    // setGetReportsError(false)

    reportsData.push(...sortedItems)
    return reportsData
  } catch (error) {
    console.log("error", error)
    // setGetReportsError(true)
    // throw error
  }
}

async function getAllAuthors() {
  try {
    if (!AWS.config.credentials) {
      AWS.config.region = "us-west-1"
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
      })
    }
    // Create a DynamoDB DocumentClient
    const docClient = new AWS.DynamoDB.DocumentClient()

    // Specify the table name
    const tableName = "authors"
    const params = {
      TableName: tableName,
    }
    const result = await docClient.scan(params).promise()
    const items = result.Items

    return items
    // setAllAuthors(items)
    // setGetReportsError(false)
  } catch (error) {
    // setGetReportsError(true)
    // throw error
  }
}

async function toggleReportVisibility(reportMetaData) {
  const reportIsActive = reportMetaData.active === "TRUE"
  AWS.config.update({ region: "us-west-1" })
  const docClient = new AWS.DynamoDB.DocumentClient()
  const tableName = "reports_metadata"

  try {
    const params = {
      TableName: tableName,
      Key: { report_uuid: reportMetaData.report_uuid },
      UpdateExpression: "set #active = :active",
      ExpressionAttributeNames: {
        "#active": "active",
      },
      ExpressionAttributeValues: {
        ":active": reportIsActive ? "FALSE" : "TRUE",
      },
    }
    await docClient.update(params).promise()
  } catch (error) {
    console.log("🚀 ~ handleVisibilityToggle ~ error:", error)
  } finally {
    getAllAuthors()
  }
}
