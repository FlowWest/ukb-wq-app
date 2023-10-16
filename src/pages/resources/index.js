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

export const usbrData = {
  header: "Weekly Bureau of Reclamation FASTA Slides",
  description:
    "Public reporting for reviewing instructions, searching existing data sources, gathering and maintaining the data needed.",
  path: "/resources/usbr",
  uploads: [
    {
      uploadDate: new Date(2023, 5, 30),
      link: "usbr/1",
    },
    {
      uploadDate: new Date(2023, 5, 23),
      link: "usbr/2",
    },
    {
      uploadDate: new Date(2023, 5, 16),
      link: "usbr/3",
    },
    {
      uploadDate: new Date(2023, 5, 9),
      link: "usbr/4",
    },
    {
      uploadDate: new Date(2023, 5, 2),
      link: "usbr/5",
    },
    {
      uploadDate: new Date(2023, 4, 26),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 19),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 12),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 5),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 3, 28),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 21),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 14),
      link: "usbr/6",
    },

    {
      uploadDate: new Date(2023, 4, 7),
      link: "usbr/6",
    },

    {
      uploadDate: new Date(2023, 4, 1),
      link: "usbr/6",
    },
  ],
}
export const usgsData = {
  header: "Weekly USGS UKL Water Quality Conditions Map",
  description:
    "Public reporting for reviewing instructions and completing and reviewing this collection of information.",
  path: "/resources/usgs",
  uploads: [
    {
      uploadDate: new Date(2023, 5, 27),
      link: "usgs/1",
    },
    {
      uploadDate: new Date(2023, 5, 20),
      link: "usgs/2",
    },
    {
      uploadDate: new Date(2023, 5, 13),
      link: "usgs/3",
    },
    {
      uploadDate: new Date(2023, 5, 5),
      link: "usgs/4",
    },
    {
      uploadDate: new Date(2023, 4, 29),
      link: "usgs/5",
    },
    {
      uploadDate: new Date(2023, 4, 22),
      link: "usgs/6",
    },
  ],
}
export const klamathData = {
  header: "Weekly Klamath Tribes Water Reports (Water Rights Regulation)",
  description:
    "Reporting for searching existing data sources, gathering the data needed, and completing and reviewing this collection.",
  path: "/resources/klamath",
  uploads: [
    {
      uploadDate: new Date(2023, 6, 12),
      link: "klamath/1",
    },
    {
      uploadDate: new Date(2023, 6, 5),
      link: "klamath/2",
    },
    {
      uploadDate: new Date(2023, 5, 28),
      link: "klamath/3",
    },
    {
      uploadDate: new Date(2023, 5, 22),
      link: "klamath/4",
    },
    {
      uploadDate: new Date(2023, 5, 14),
      link: "klamath/5",
    },
    {
      uploadDate: new Date(2023, 5, 7),
      link: "klamath/6",
    },
  ],
}

export const owrdData = {
  header: "Weekly OWRD Hydrology Report",
  description:
    "Klamath Basin Hydrology Report as prepared by Oregon Water Resources Department.",
  path: "/resources/owrd",
  uploads: [
    {
      uploadDate: new Date(2023, 5, 30),
      link: "usbr/1",
    },
    {
      uploadDate: new Date(2023, 5, 23),
      link: "usbr/2",
    },
    {
      uploadDate: new Date(2023, 5, 16),
      link: "usbr/3",
    },
    {
      uploadDate: new Date(2023, 5, 9),
      link: "usbr/4",
    },
    {
      uploadDate: new Date(2023, 5, 2),
      link: "usbr/5",
    },
    {
      uploadDate: new Date(2023, 4, 26),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 19),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 12),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 5),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 3, 28),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 21),
      link: "usbr/6",
    },
    {
      uploadDate: new Date(2023, 4, 14),
      link: "usbr/6",
    },

    {
      uploadDate: new Date(2023, 4, 7),
      link: "usbr/6",
    },

    {
      uploadDate: new Date(2023, 4, 1),
      link: "usbr/6",
    },
  ],
}

const Resources = () => {
  const { user } = useContext(UserContext) || {}
  const [uploadReportModalOpen, setUploadReportModalOpen] = useState(false)
  const { isTabletScreenSize, handleResize } = useTabletScreenSize()
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
            <WeeklyUploadCard data={usbrData} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard data={usgsData} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard data={klamathData} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <WeeklyUploadCard data={owrdData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default Resources
