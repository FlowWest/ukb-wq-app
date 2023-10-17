import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../gatsby-browser"
import Layout from "../../components/Layout"
import SEO from "../../components/Seo"
import { Grid, Header, Divider, Button, Modal } from "semantic-ui-react"
import UploadReportForm from "../../components/forms/UploadReportForm"
import { Link } from "gatsby"
import WeeklyUploadCard from "../../components/WeeklyUploadCard"
import ResourceQuickLinks from "../../components/ResourceQuickLinks"
import useTabletScreenSize from "../../hooks/useTabletScreenSize"
import UploadResourceForm from "../../components/forms/UploadResourceForm"
import { groupBy, orderBy } from "lodash"

export const usbrData = {
  header: "Weekly Bureau of Reclamation FASTA Slides",
  description:
    "Public reporting for reviewing instructions, searching existing data sources, gathering and maintaining the data needed.",
  path: "/resources/usbr",
}
export const usgsData = {
  header: "Weekly USGS UKL Water Quality Conditions Map",
  description:
    "Public reporting for reviewing instructions and completing and reviewing this collection of information.",
  path: "/resources/usgs",
}
export const klamathData = {
  header: "Weekly Klamath Tribes Water Reports (Water Rights Regulation)",
  description:
    "Reporting for searching existing data sources, gathering the data needed, and completing and reviewing this collection.",
  path: "/resources/klamath",
}

export const owrdData = {
  header: "Weekly OWRD Hydrology Report",
  description:
    "Klamath Basin Hydrology Report as prepared by Oregon Water Resources Department.",
  path: "/resources/owrd",
}

const Resources = () => {
  const { user } = useContext(UserContext) || {}
  const [uploadReportModalOpen, setUploadReportModalOpen] = useState(false)
  const { isTabletScreenSize, handleResize } = useTabletScreenSize()
  const [groupedWeeklyReports, setGroupedWeeklyReports] = useState({
    fasta: [],
    usgs: [],
    klamath: [],
    owrd: [],
    sonde: [],
  })
  const [getReportsError, setGetReportsError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await getAllReports()
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const getAllReports = async () => {
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
      const tableName = "weekly_reports_metadata"
      const params = {
        TableName: tableName,
      }
      const result = await docClient.scan(params).promise()
      const items = result.Items

      const reportsData = orderBy(items, (item) => new Date(item.date), [
        "desc",
      ])

      const groupedWeeklyReports = groupBy(reportsData, "type")
      setGroupedWeeklyReports(groupedWeeklyReports)

      setGetReportsError(false)
    } catch (error) {
      setGetReportsError(true)
      // throw error
    }
  }

  return (
    <Layout pageInfo={{ pageName: "resources" }}>
      <SEO title="Water Quality Resources" />
      <Grid
        fluid
        columns={3}
        stackable
        stretched
        doubling
        container
        className="grid-container"
      >
        <Grid.Row>
          <Header as="h1">Quick Links</Header>
        </Grid.Row>
        <ResourceQuickLinks />
      </Grid>
      <Divider section />
      <Grid container stackable doubling className="grid-container">
        <Grid.Row>
          {user && Object.keys(user).length > 0 && (
            <Modal
              closeIcon
              open={uploadReportModalOpen}
              onOpen={() => setUploadReportModalOpen(true)}
              onClose={() => setUploadReportModalOpen(false)}
              trigger={
                <Grid.Column
                  mobile={16}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    color="blue"
                    icon="upload"
                    content={"Upload Resource"}
                  />
                </Grid.Column>
              }
            >
              <Modal.Header>Upload Resource</Modal.Header>
              <Modal.Content>
                <UploadResourceForm
                  onClose={() => setUploadReportModalOpen(false)}
                  getAllReports={getAllReports}
                />
              </Modal.Content>
            </Modal>
          )}
        </Grid.Row>
        <Grid.Row>
          <Header as="h1">Weekly Reports</Header>
        </Grid.Row>
        <Grid.Row columns={4}>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard
              metadata={usbrData}
              reports={groupedWeeklyReports.fasta}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard
              metadata={usgsData}
              reports={groupedWeeklyReports.usgs}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard
              metadata={klamathData}
              reports={groupedWeeklyReports.klamath}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard
              metadata={owrdData}
              reports={groupedWeeklyReports.owrd}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default Resources
