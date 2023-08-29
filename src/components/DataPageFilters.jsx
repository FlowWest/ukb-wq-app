import React from "react"
import { Dropdown, Grid, Button, Form, Segment } from "semantic-ui-react"
import { useForm, Controller } from "react-hook-form"

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

var yearsOptions = []

// Loop through the years and add them to the array
for (var year = 1980; year <= 2023; year++) {
  yearsOptions.push({ text: year, key: year, value: year })
}

const characteristicNameOptions = [
  {
    key: "Count",
    text: "Count",
    value: "Count",
  },
  {
    key: "Total Sample Weight",
    text: "Total Sample Weight",
    value: "Total Sample Weight",
  },
  {
    key: "Phytoplankton Density",
    text: "Phytoplankton Density",
    value: "Phytoplankton Density",
  },
]

const DataPageFilters = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startRange: "",
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns={4}>
          <Grid.Column width={3}>
            <Controller
              name="startRange"
              control={control}
              render={({ field }) => (
                <Form.Field {...field}>
                  <label>Start Year</label>
                  <Dropdown
                    placeholder="Select Start Year"
                    fluid
                    selection
                    options={yearsOptions}
                    onChange={(e, { value }) => field.onChange(value)}
                  />
                </Form.Field>
              )}
            />
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
                options={characteristicNameOptions}
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
      </Form>
    </Segment>
  )
}

export default DataPageFilters
