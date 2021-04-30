import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import LinePlot from "../components/linePlot"
import BoxPlot from "../components/boxPlot"

const Dashboard = () => (
  <Layout pageInfo={{ pageName: "dashboard" }}>
    <SEO title="Dashboard" />
    <h1>Water Quality Dashboard</h1>
    <p>data stuff</p>
    <BoxPlot />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Dashboard
