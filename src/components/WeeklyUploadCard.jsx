import React from "react"
import { Card, Button, Grid, List } from "semantic-ui-react"
import { Link } from "gatsby"
import { formatDate } from "../helpers/utils"

const ResourcePhoto = () => (
  <div className="resource-photo-container">
    <div className="resource-placeholder">Placeholder</div>
  </div>
)

const WeeklyUploadCard = ({ metadata, reports = [] }) => {
  const { header, path, description } = metadata
  const [mostRecent, ...remainingUploads] = reports

  const bucketLink =
    "https://klamath-water-quality-app.s3-us-west-2.amazonaws.com"
  return (
    <Card fluid>
      <Card.Content>
        <ResourcePhoto />
        <Card.Header className="weekly-upload-card-header">
          {header}
        </Card.Header>
        <Card.Meta>
          Last Upload:{" "}
          {mostRecent ? formatDate(new Date(mostRecent.date)) : "N/A"}
        </Card.Meta>
        <Card.Description className="weekly-upload-card-description">
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          href={mostRecent ? `${bucketLink}/${mostRecent.filename}` : ""}
          disabled={!mostRecent}
          fluid
          target="_blank"
          rel="noreferrer"
        >
          View Most Recent Upload
        </Button>
      </Card.Content>
      <Card.Content extra>
        <List size="medium">
          <List.Header className="previous-report-weekly-header">
            Recently Uploaded Reports
          </List.Header>
          {reports.length ? (
            reports.slice(0, 5).map((upload) => (
              <List.Item key={upload.date}>
                <a
                  href={`${bucketLink}/${upload.filename}`}
                  disabled={!mostRecent}
                  fluid
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatDate(upload.date)}
                </a>
              </List.Item>
            ))
          ) : (
            <List.Item>N/A</List.Item>
          )}
        </List>
        <Link to={path} state={{ reports }}>
          {reports.length > 0 && <b>View All</b>}
        </Link>
      </Card.Content>
    </Card>
  )
}

export default WeeklyUploadCard
