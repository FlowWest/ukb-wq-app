import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"

const DataRepo = () => (
  <Layout pageInfo={{ pageName: "data-repository" }}>
    <SEO title="Data Repository" />
    <h1>Data Repository</h1>
    <p>Downloads available</p>
    <DataDownload/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DataRepo
