import React from "react"
import Layout from "../../components/Layout"
import SEO from "../../components/Seo"
import { Grid, Header, Divider } from "semantic-ui-react"
import { Link } from "gatsby"
import WeeklyUploadCard from "../../components/WeeklyUploadCard"

const ResourceUpload = ({ title, description, link }) => (
  <Grid.Column className="resource-upload-container">
    <Header className="resource-upload-header">{title}</Header>
    <p className="resource-upload-description">{description}</p>
    <Link to={link.to}>{link.label}</Link>
  </Grid.Column>
)

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
  return (
    <Layout pageInfo={{ pageName: "resources" }}>
      <SEO title="Water Quality Resources" />
      <Grid
        container
        divided="vertically"
        columns={3}
        stackable
        className="remove-negative-margin"
      >
        <Grid.Row>
          <Header as="h1">Quick Links</Header>
        </Grid.Row>
        <ResourceUpload
          title="Bureau of Reclamation Tea Cup"
          description="Each of the major Reclamation Reservoirs in the basin will be represented by a Tea-Cup Diagram. The level of blue fill in the Tea-Cup represents the level of fill in the reservoir."
          link={{ to: "#", label: "Link to Bureau of Reclamation Tea Cup" }}
        />
        <ResourceUpload
          title="USGS Upper Klamath Lake Elevations"
          description="Retrieve current streamflow and other real-time data for one or multiple sites, using sets of flexible, predefined filters, since October 1, 2007."
          link={{
            to: "#",
            label: "Link to USGS Upper Klamath Lake Elevations",
          }}
        />
        <ResourceUpload
          title="USGS Sprague River Flow and Water Quality"
          description="Retrieve daily, monthly or annual statistics for sites. Statistics are provided on approved data only for time-series sites."
          link={{
            to: "#",
            label: "Link to USGS Sprague River Flow and Water Quality",
          }}
        />

        <ResourceUpload
          title="USGS Williamson River Flow and Water Quality"
          description="The service allows searches for USGS sites and site information using a variety of flexible filters. A test tool is also available."
          link={{
            to: "#",
            label: "Link to USGS Williamson River Flow and Water Quality",
          }}
        />
        <ResourceUpload
          title="USGS Klamath River Basin Water Quality Mapper"
          description="This map interface represents continuous and discrete water-quality data collected by Bureau of Reclamation and USGS at Klamath Basin sites."
          link={{
            to: "https://or.water.usgs.gov/proj/klamath_wq_mapper/",
            label: "Link to USGS Klamath River Basin Water Quality Mapper",
          }}
        />
        <ResourceUpload
          title="USGS Upper Klamath Basin Well Mapper"
          description="This mapper identifies wells that are monitored in the Upper Klamath Basin Oregon and California by USGS, OWRD and CDWR."
          link={{
            to: "https://or.water.usgs.gov/projs_dir/klamath_wells/#",
            label: "Link to UUSGS Upper Klamath Basin Well Mapper",
          }}
        />
      </Grid>
      <Divider section />
      <Grid container stackable doubling className="remove-negative-margin">
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
