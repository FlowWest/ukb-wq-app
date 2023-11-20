import { sum } from "lodash"
import * as AWS from "aws-sdk"

export const formatTextCasing = (str) => {
  var splitStr = str?.split(" ") || []
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(" ")
}

export const calcMapCenter = (monitoringLocations) => {
  const latValues = []
  const longValues = []

  monitoringLocations.forEach((location) => {
    latValues.push(+location.latitude_measure)
    longValues.push(+location.longitude_measure)
  })

  const avgLat = sum(latValues) / monitoringLocations.length
  const avgLong = sum(longValues) / monitoringLocations.length

  const center = [avgLat, avgLong]

  return center
}

export const formatDate = (date) =>
  Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date))

export function generateAuthorReportMap(authors, reports, sortMethod) {
  const authorReportMap = {}

  authors?.forEach((author) => {
    const authorKey = author.author_name
    const authorId = author.author_uuid

    const authorReports = sortMethod
      .sort(reports)
      .filter((report) => report.authors?.includes(authorKey))

    authorReportMap[authorKey] = {
      id: authorId,
      reports: authorReports.map((report) => ({
        id: report.report_id,
        ...report,
      })),
    }
  })

  return authorReportMap
}

export function removeNameFromString(nameToRemove, namesString) {
  const namesArray = namesString.split(",").map((name) => name.trim())

  const filteredNames = namesArray.filter((name) => name !== nameToRemove)

  return filteredNames.join(", ")
}

// export const getAllAuthors = async () => {
//   try {
//     if (!AWS.config.credentials) {
//       AWS.config.region = "us-west-1"
//       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
//       })
//     }
//     // Create a DynamoDB DocumentClient
//     const docClient = new AWS.DynamoDB.DocumentClient()

//     // Specify the table name
//     const tableName = "authors"
//     const params = {
//       TableName: tableName,
//     }
//     const result = await docClient.scan(params).promise()
//     const items = result.Items
//     return items
//     // setGetReportsError(false)
//   } catch (error) {
//     // setGetReportsError(true)
//     // throw error
//   }
// }
