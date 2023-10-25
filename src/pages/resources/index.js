import { groupBy, orderBy } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { Button, Divider, Grid, Header, Modal } from "semantic-ui-react"
import { UserContext } from "../../../gatsby-browser"
import Layout from "../../components/Layout"
import ResourceQuickLinks from "../../components/ResourceQuickLinks"
import SEO from "../../components/Seo"
import WeeklyUploadCard from "../../components/WeeklyUploadCard"
import UploadResourceForm from "../../components/forms/UploadResourceForm"
import useTabletScreenSize from "../../hooks/useTabletScreenSize"
import {
  usbrData,
  klamathData,
  owrdData,
  sondeData,
  usgsData,
} from "../../helpers/weeklyResourceCardData"

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
                  floated="right"
                  mobile={16}
                  computer={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    fluid
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
        <Grid.Row columns={4} className="weekly-upload-cards-container">
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={3}
            largeScreen={3}
            className="weekly-upload-card-wrapper"
          >
            <WeeklyUploadCard
              metadata={usbrData}
              reports={groupedWeeklyReports.fasta}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={3}
            largeScreen={3}
            className="weekly-upload-card-wrapper"
          >
            <WeeklyUploadCard
              metadata={usgsData}
              reports={groupedWeeklyReports.usgs}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={3}
            largeScreen={3}
            className="weekly-upload-card-wrapper"
          >
            <WeeklyUploadCard
              metadata={klamathData}
              reports={groupedWeeklyReports.klamath}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={3}
            largeScreen={3}
            className="weekly-upload-card-wrapper"
          >
            <WeeklyUploadCard
              metadata={owrdData}
              reports={groupedWeeklyReports.owrd}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={3}
            largeScreen={3}
            className="weekly-upload-card-wrapper"
          >
            <WeeklyUploadCard
              metadata={sondeData}
              reports={groupedWeeklyReports.sonde}
              downloadOnly
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default Resources
