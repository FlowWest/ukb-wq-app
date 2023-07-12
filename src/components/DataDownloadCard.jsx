import React, { useContext } from "react"
import { Card, Button, Dropdown, Modal } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"
import { UserContext } from "../../gatsby-browser"

const DataDownloadCard = ({ reportMetaData }) => {
  const reportIsActive = reportMetaData.active === "TRUE"
  console.log("🚀 ~ DataDownloadCard ~ reportIsActive:", reportIsActive)

  const { user } = useContext(UserContext)
  const authorsArray = reportMetaData.authors.split(",")

  const generateAuthorsString = (authors) => {
    if (authors.length <= 3) return authors.join(",")

    const firstThreeAuthors = authors.slice(0, 3)
    const remainingAuthors = authors.slice(3)

    return `${firstThreeAuthors.join(",")}, and ${remainingAuthors.length} ${
      remainingAuthors.length === 1 ? "other" : "others"
    }`
  }

  return (
    <Card
      color="blue"
      link
      fluid
      className={`report-card ${reportIsActive ? "" : "report-card-hidden"}`}
    >
      <Card.Content>
        <Card.Header as="h6" className="report-card-header">
          {reportMetaData.title}
        </Card.Header>
        <Card.Meta className="report-card-subheader">
          {formatTextCasing(reportMetaData.type)}
        </Card.Meta>
        <Card.Description>
          <strong>Author(s)</strong>: {generateAuthorsString(authorsArray)}{" "}
          <br />
          <strong>Location</strong>: {reportMetaData.location} <br />
          <strong>Year</strong>: {reportMetaData.year}{" "}
          {reportMetaData.endyear !== "NA"
            ? ` - ${reportMetaData.endyear}`
            : null}
          <br />
        </Card.Description>
      </Card.Content>
      <Card.Content extra className="card-action-buttons">
        <Button
          as="a"
          href={`https://klamath-water-quality-app.s3-us-west-2.amazonaws.com/${reportMetaData.filename}`}
          target="_blank"
          rel="noreferrer"
          basic
          className="report-cta"
        >
          View
        </Button>
        {user && (
          <Dropdown
            button
            basic
            className="button icon"
            direction="left"
            floating
            icon="vertical ellipsis"
            text=" "
            upward
            options={[
              {
                key: "toggle visibility",
                value: "toggle visibility",
                text: (
                  <Dropdown.Item>
                    Mark as {reportIsActive ? "Visible" : "Hidden"}
                  </Dropdown.Item>
                ),
              },
              {
                key: "delete",
                value: "delete",
                text: (
                  <Modal
                    trigger={<Dropdown.Item>Delete Report</Dropdown.Item>}
                    header="Delete Report"
                    content="Are you sure you would like to delete this report?"
                    actions={[
                      "Cancel",
                      { key: "delete", content: "Delete", negative: true },
                    ]}
                  />
                ),
              },
            ]}
          />
        )}
      </Card.Content>
    </Card>
  )
}

export default DataDownloadCard
