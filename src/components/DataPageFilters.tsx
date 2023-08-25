import React from "react"
import { Dropdown, Grid, Button, Form, Segment } from "semantic-ui-react"

const friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
  },
  {
    key: "Elliot Fu",
    text: "Elliot Fu",
    value: "Elliot Fu",
  },
  {
    key: "Stevie Feliciano",
    text: "Stevie Feliciano",
    value: "Stevie Feliciano",
  },
  {
    key: "Christian",
    text: "Christian",
    value: "Christian",
  },
  {
    key: "Matt",
    text: "Matt",
    value: "Matt",
  },
  {
    key: "Justen Kitsune",
    text: "Justen Kitsune",
    value: "Justen Kitsune",
  },
]

const DataPageFilters = () => {
  return (
    <Segment>
      <Grid columns={4}>
        <Grid.Column width={3}>
          <Form.Field>
            <label>Start Year</label>
            <Dropdown
              placeholder="Select Start Year"
              fluid
              selection
              options={friendOptions}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={3}>
          <Form.Field>
            <label>End Year</label>
            <Dropdown
              placeholder="Select End Year"
              fluid
              selection
              options={friendOptions}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form.Field>
            <label>Filter Parameter</label>
            <Dropdown
              placeholder="Select Parameter"
              fluid
              selection
              options={friendOptions}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column
          width={4}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <Button fluid color="blue">
            Filter
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default DataPageFilters
