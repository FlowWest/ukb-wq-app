import React from "react"
import { Grid, Header, Divider } from "semantic-ui-react"
import { Link } from "gatsby"

const ResourceUpload = ({ title, description, to }) => (
  <Grid.Column>
    <Link to={to} target="_blank" className="resource-upload-content">
      <Header className="resource-upload-header">{title}</Header>
      <p className="resource-upload-description">{description}</p>
    </Link>
  </Grid.Column>
)

const ResourceQuickLinks = () => {
  return (
    <>
      <ResourceUpload
        title="Bureau of Reclamation Tea Cup"
        description="Major storage reservoirs in the Klamath River Basin, provided by the Bureau of Reclamation Mid Pacific Region."
        to="https://www.usbr.gov/pn/hydromet/klamath/teacup.html"
      />
      <ResourceUpload
        title="USGS Upper Klamath Lake Elevations"
        description="Most recent Upper Klamath Lake elevations, provided by the U.S. Geological Survey."
        to="https://waterdata.usgs.gov/monitoring-location/11507001/#parameterCode=62615&period=P7D&showMedian=true"
      />
      <ResourceUpload
        title="USGS Sprague River Flow and Water Quality"
        description="Most recent Sprague River monitoring, provided by the U.S. Geological Survey."
        // description="Most recent Sprague River monitoring, provided by the U.S. Geological Survey. Parameters include: gage height, discharge, specific conductance, suspended sediment, suspended sediment load, water temperature, and turbidity."
        to="https://waterdata.usgs.gov/monitoring-location/11501000/#parameterCode=00065&period=P7D"
      />
      <ResourceUpload
        title="USGS Williamson River Flow and Water Quality"
        description="Most recent Williamson River monitoring, provided by the U.S. Geological Survey."
        // description="Most recent Williamson River monitoring, provided by the U.S. Geological Survey. Parameters include: gage height, discharge, specific conductance, suspended sediment, suspended sediment load, water temperature, and turbidity."
        to="https://waterdata.usgs.gov/monitoring-location/11502500/#parameterCode=00060&period=P365D&showMedian=true"
      />
      <ResourceUpload
        title="USGS Klamath River Basin Water Quality Mapper"
        description="A Klamath River Basin water quality mapper built by the USGS, with links to most recent continuous and discrete data for each site."
        // description="A Klamath River Basin water quality mapper built by the U.S. Geological Survey. Tool provides a monitoring location map with links to most recent continuous and discrete data for each site. Only data collected by the Bureau of Reclamation and the USGS are included."
        to="https://or.water.usgs.gov/proj/klamath_wq_mapper/"
      />
      <ResourceUpload
        title="USGS Upper Klamath Basin Well Mapper"
        description="A map displaying wells that are monitored in the Upper Klamath Basin by the USGS, OWRD, and CDW."
        // description="A map displaying wells that are monitored in the Upper Klamath Basin by the U.S. Geological Survey, Oregon Water Resources Department, and California Department of Water."
        to="https://or.water.usgs.gov/projs_dir/klamath_wells/#"
      />
    </>
  )
}

export default ResourceQuickLinks
