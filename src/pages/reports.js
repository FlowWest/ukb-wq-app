import React, { useState } from "react"
import { Grid } from "semantic-ui-react"
import Layout from "../components/Layout"
import ReportsPageContent from "../components/ReportsPageContent"
import SEO from "../components/Seo"
import { ReportModalProvider } from "../hooks/useReportModalContext"

const ReportsPage = () => {
  const [getReportsError, setGetReportsError] = useState(false)

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      {getReportsError ? (
        <Grid container className="error-message">
          Error retrieving reports. Please refresh the page to try again.
        </Grid>
      ) : (
        <ReportModalProvider>
          <ReportsPageContent />
        </ReportModalProvider>
      )}
    </Layout>
  )
}

// export const query = graphql`
//   query {
//     allReportsMetadataCsv {
//       distinct(field: type)
//       nodes {
//         authors
//         year
//         endyear
//         filename
//         location
//         organization
//         title
//         type
//         active
//       }
//     }
//   }
// `

export default ReportsPage
