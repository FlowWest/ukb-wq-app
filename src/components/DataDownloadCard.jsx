import React, { useState } from "react"
import { Card, Button, Icon, Dropdown, Modal } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"

const DataDownloadCard = ({ reportMetaData }) => {
  const userIsAdmin = sessionStorage.getItem("admin-cookie")
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
        >
          View
        </Button>
        {userIsAdmin && (
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
