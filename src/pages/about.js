import React from "react"
import { Link } from "gatsby"
import { Grid, Header, Item } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

export default ({ data }) => (
  <Layout pageInfo={{ pageName: "about" }}>
    <SEO title="Water Quality Monitoring Data" />
    <Grid container>
      {/* <Grid.Row>
        <Header
          as="h1"
          content="Klamath Tribes Water Quality Monitoring Program"
        />
      </Grid.Row> */}
      <Grid.Row>
        <Item className="map-paragraph">
          <Item.Content>
            <Map monitoringLocations={data.allMonitoringLocationsCsv.edges} />{" "}
            <p>
              The Klamath Tribes have monitored water quality conditions in
              Upper Klamath Lake since 1990 and major tributaries including the
              Sprague, Williamson, and Wood Rivers since 2001. The monitoring
              program includes sampling water nutrients, water chemistry, algal
              toxins, and aquatic biota at up to 11 lake sites and water
              nutrients, water chemistry, and stream discharge at up to 20 river
              and stream sites.
            </p>
            <p>
              The Klamath Tribes overall water quality monitoring program goals
              are to characterize baseline conditions and long-term trends in
              Upper Klamath Basin water bodies including Upper Klamath Lake and
              major tributaries. Monitoring is key in prioritizing areas for
              restoration activities and for analyzing trends associated with
              climate change and ongoing aquatic and riparian restoration work.
              This data is extremely valuable to restoration practitioners,
              researchers, and regulatory agencies in the basin. Currently, all
              water quality technicians associated with the monitoring program
              are members of The Klamath Tribes; the program provides permanent
              and stable employment in our rural indigenous community.
            </p>
            <p>
              Upper Klamath Lake sampling occurs every two weeks from May
              through October. Data collected at 10 sites includes zooplankton,
              phytoplankton, depth, water temperature, conductivity, pH,
              dissolved oxygen, oxidative reduction potential, water clarity and
              collection of water samples for lab analyses of 9 analytes. These
              include: total phosphorus (TP), soluble reactive phosphorus (SRP),
              ammonia (NH3), nitrate+nitrite (NO3+NO2), nitrate (NO3), silicon
              dioxide (SiO2), Chlorophyll-a, Phaeophytin-a, and microcystin
              toxin. From October through May Upper Klamath Lake is sampled at
              one station near the outlet of the lake.
            </p>
            <p>
              The Klamath Tribes also conducts biweekly nutrient loading
              monitoring throughout the year in tributaries to Upper Klamath
              Lake including several in the Wood River watershed and 10 sites in
              the Williamson/Sprague River watershed. Sample parameters include:
              water depth, temperature, conductivity, pH, DO, discharge, and
              velocity. Water chemistry samples are tested for TP, SRP, NH3,
              NO3+NO2, NO3, SiO2, Chlorophyll-a, Phaeophyton-a, total suspended
              solids, and turbidity.
            </p>
            <p>
              The Klamath Tribes developed Standard Operating Procedures for all
              aspects of water sampling including: Upper Klamath Lake Field
              Sampling; Tributary Field Sampling; Processing, Preparation,
              Preservation, and Spiking Field Samples; and Sample Receipt and
              Control. Further, the Tribes follow quality assurance and quality
              control procedures describing methods and procedures to ensure
              well-documented data of known quality. The Klamath Tribes Quality
              Assurance Project Plan was accepted and approved by the
              Environmental Protection Agency (Region 10 Quality Assurance
              Manager). We calibrate meters before each monitoring day and check
              their accuracy after monitoring to ensure our data is accurate.
              For more information on methods, please see the SOPs and QAPP
              documents in the reference library associated with this APP or
              contact Mark Buettner at{" "}
              <a href="mailto:mark.buettner@klamathtribes.com">
                mark.buettner@klamathtribes.com
              </a>
              .
            </p>
          </Item.Content>
        </Item>
      </Grid.Row>
    </Grid>
  </Layout>
)

export const query = graphql`
  query {
    allMonitoringLocationsCsv {
      edges {
        node {
          Latitude
          Longitude
          Monitoring_Location_ID
          Monitoring_Location_Name
          Monitoring_Location_Type
        }
      }
    }
  }
`
