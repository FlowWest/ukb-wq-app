import React from "react"
import { Card, Button } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"

const DataDownload = ({ reportMetaData }) => {
  const clickHandler = () => {}
  return (
    <Card className="report-card">
      <Card.Content>
        <Card.Header as="h5">{reportMetaData.title}</Card.Header>
        <Card.Meta>{formatTextCasing(reportMetaData.type)}</Card.Meta>
        <Card.Description>
          <strong>Author(s)</strong>: {reportMetaData.authors} <br />
          <strong>Location</strong>: {reportMetaData.location} <br />
          <strong>Year</strong>: {reportMetaData.year}{" "}
          {reportMetaData.endyear !== "NA"
            ? ` - ${reportMetaData.endyear}`
            : null}
          <br />
        </Card.Description>
        <a
          href={`https://klamath-water-quality-app.s3-us-west-2.amazonaws.com/${reportMetaData.filename}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button primary className="view-report-button">
            View
          </Button>
        </a>
      </Card.Content>
    </Card>
  )
}

export default DataDownload
