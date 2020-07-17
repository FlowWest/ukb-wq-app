import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DataRepo = () => (
  <Layout pageInfo={{ pageName: "data-repository" }}>
    <SEO title="Data Repository" />
    <h1>Data Repository</h1>
    <p>Downloads available</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DataRepo
