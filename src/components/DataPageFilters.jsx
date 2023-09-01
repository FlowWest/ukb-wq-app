import React from "react"
import { Dropdown, Grid, Button, Form, Segment } from "semantic-ui-react"
import { useForm, Controller } from "react-hook-form"
import { calcMapCenter } from "../helpers/utils"

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

const DataPageFilters = ({
  monitoringLocations,
  setSelectedFilters,
  map,
  markerRef,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startRange: "",
      endRange: "",
      characteristicName: "",
      monitoringLocation: "",
    },
  })
  const onSubmit = (data) => {
    setSelectedFilters(data)
    // const onSelectShowMarker = (index) => {
    if (!map) {
      return
    }
    const marker = markerRef.current
    const selectedMonitoringLocationIndex = monitoringLocations
      .map((location) => location.monitoring_location_identifier)
      .indexOf(getValues("monitoringLocation"))
    console.log(
      "🚀 ~ //onSelectShowMarker ~ selectedMonitoringLocationIndex:",
      selectedMonitoringLocationIndex
    )

    console.log("🚀 ~ //onSelectShowMarker ~ marker:", marker)

    if (selectedMonitoringLocationIndex === -1) {
      const center = calcMapCenter(monitoringLocations)
      map.closePopup()
      map.flyTo(center, 8)
    } else {
      const markerPosition = [
        marker[selectedMonitoringLocationIndex].current._latlng.lat + 0.03,
        marker[selectedMonitoringLocationIndex].current._latlng.lng,
      ]
      marker[selectedMonitoringLocationIndex].current.openPopup()
      map.flyTo(markerPosition, 13)
    }
  }

  const monitoringLocationOptions = monitoringLocations.map((node, index) => ({
    key: node.monitoring_location_identifier,
    text: node.monitoring_location_identifier,
    value: node.monitoring_location_identifier,
    // onClick: () => {
    //   setSelectedMonitoringLocation(node)
    //   onSelectShowMarker(index)
    // },
  }))

  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns={4}>
          <Grid.Column width={8} style={{ paddingBottom: 0 }}>
            <Controller
              name="monitoringLocation"
              control={control}
              render={({ field }) => (
                <Form.Field {...field}>
                  <label>Filter Monitoring Location</label>
                  <Dropdown
                    placeholder="Select Parameter"
                    fluid
                    selection
                    defaultValue="All Locations"
                    options={[
                      {
                        text: "All Locations",
                        value: "All Locations",
                        key: "All Locations",
                        // onClick: () => {
                        //   setSelectedMonitoringLocation(null)
                        //   onSelectShowMarker(null)
                        // },
                      },
                      ...monitoringLocationOptions,
                    ]}
                    onChange={(e, { value }) => field.onChange(value)}
                  />
                </Form.Field>
              )}
            />
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingBottom: 0 }}>
            <Controller
              name="characteristicName"
              control={control}
              render={({ field }) => (
                <Form.Field {...field}>
                  <label>Characteristic Name</label>
                  <Dropdown
                    placeholder="Select Parameter"
                    fluid
                    selection
                    options={characteristicNameOptions}
                    onChange={(e, { value }) => field.onChange(value)}
                  />
                </Form.Field>
              )}
            />
          </Grid.Column>

          <Grid.Column width={6}>
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
          <Grid.Column width={6}>
            <Controller
              name="endRange"
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
