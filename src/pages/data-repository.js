import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"

const DataRepo = ({ data }) => {
  const dataSets = data.allMetadataTableCsv.edges.map((dataset, key) => {
    return (
      <DataDownload
        datasetName={dataset.node.dataset_name}
        description={dataset.node.parameters}
        geographicExtent={dataset.node.geographic_extent}
        startYear={dataset.node.start_year}
        endYear={dataset.node.end_year}
        key={key}
      />
    )
  })

  return (
    <Layout pageInfo={{ pageName: "data-repository" }}>
      <SEO title="Data Repository" />
      <h1>Data Repository</h1>
      <p>Downloads available</p>
      {dataSets}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default DataRepo

export const query = graphql`
  query DataSetQuery {
    allMetadataTableCsv {
      edges {
        node {
          dataset_name
          start_year(fromNow: false)
          end_year(fromNow: false)
          geographic_extent
          parameters
          sampling_sites_count
          sampling_type
        }
      }
    }
  }
`
