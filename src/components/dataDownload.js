import React from "react"
import { Card } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"

const DataDownload = ({ reportMetaData }) => {
  return (
    <a
      href={`https://klamath-water-quality-app.s3-us-west-2.amazonaws.com/${reportMetaData.filename}`}
      target="_blank"
      rel="noreferrer"
    >
      <Card  color="blue" link fluid className="report-card"  >
      {/* <Card className="report-card" color="blue" link > */}
        <Card.Content>
          <Card.Header as="h6" className="report-card-header">
            {reportMetaData.title}
          </Card.Header>
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
        </Card.Content>
      </Card>
    </a>
  )
}

export default DataDownload
