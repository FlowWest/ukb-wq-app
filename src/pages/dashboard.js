import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Dashboard = () => (
  <Layout pageInfo={{ pageName: "dashboard" }}>
    <SEO title="Dashboard" />
    <h1>Water Quality Dashboard</h1>
    <p>data stuff</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Dashboard