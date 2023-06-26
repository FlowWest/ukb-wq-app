import React from "react"
import { Card, Button } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"

const DataDownloadCard = ({ reportMetaData }) => {
  return (
    <a
      href={`https://klamath-water-quality-app.s3-us-west-2.amazonaws.com/${reportMetaData.filename}`}
      target="_blank"
      rel="noreferrer"
    >
      <Card color="blue" link fluid className="report-card">
        {/* <Card className="report-card" color="blue" link > */}
        <Card.Content>
          <Card.Header as="h6" className="report-card-header">
            {reportMetaData.title}
          </Card.Header>
          <Card.Meta className="report-card-subheader">
            {formatTextCasing(reportMetaData.type)}
          </Card.Meta>
          <Card.Description>
            <strong>Author(s)</strong>: {reportMetaData.authors} <br />
            <strong>Location</strong>: {reportMetaData.location} <br />
            <strong>Year</strong>: {reportMetaData.year}{" "}
            {reportMetaData.endyear !== "NA"
              ? ` - ${reportMetaData.endyear}`
              : null}
            <br />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button fluid color="blue" inverted>
            View
          </Button>
        </Card.Content>
      </Card>
    </a>
  )
}

export default DataDownloadCard
