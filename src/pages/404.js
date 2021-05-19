import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "semantic-ui-react"

export default () => (
  <Layout pageInfo={{ pageName: "notFound" }}>
    <SEO title="404: Not found" />
    <Container text textAlign="center">
      <p>The URL you are trying to visit doesn&#39;t exist.</p>
    </Container>
  </Layout>
)
