import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const WQReports = () => (
  <Layout pageInfo={{ pageName: "reports" }}>
    <SEO title="Water Quality Reports" />
    <h1>Water Quality Reports</h1>
    <p>Reports available for download</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default WQReports
