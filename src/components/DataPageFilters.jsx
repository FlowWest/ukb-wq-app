import React from "react"
import { Dropdown, Grid, Button, Form, Segment, Popup } from "semantic-ui-react"
import { useForm, Controller } from "react-hook-form"
import { calcMapCenter } from "../helpers/utils"
import { useState } from "react"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import DatePicker from "react-datepicker"
import { yupResolver } from "@hookform/resolvers/yup"
import { dataFiltersSchema } from "../helpers/validationSchemas"

dayjs.extend(isBetween)

function filterDateRange(startDate, endDate, dateString) {
  const isWithinRange = dayjs(dateString).isBetween(
    dayjs(`${startDate || "1980-01-01"}`),
    dayjs(`${endDate || dayjs().year()}`),
    null,
    "[]"
  )

  return isWithinRange
}

function mapFlyToDefaultView(monitoringLocations, map) {
  const center = calcMapCenter(monitoringLocations)
  map.closePopup()
  map.flyTo(center, 8)
}

const DataPageFilters = ({
  monitoringLocations,
  setSelectedFilters,
  map,
  markerRef,
  allKlamathData,
  setFilteredKlamathData,
}) => {
  const { handleSubmit, watch, control, reset, getValues } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      characteristicName: "",
      monitoringLocation: "",
    },
    resolver: yupResolver(dataFiltersSchema),
  })
  const monitoringLocationValue = watch("monitoringLocation")
  const startDateValue = watch("startDate")
  const endDateValue = watch("endDate")

  const onSubmit = (data) => {
    setSelectedFilters(data)
    const {
      monitoringLocation: monitoringLocationValue,
      characteristicName: characteristicNameValue,
    } = data
    if (!map) {
      return
    }
    const marker = markerRef.current
    const selectedMonitoringLocationIndex = monitoringLocations
      .map((location) => location.monitoring_location_identifier)
      .indexOf(monitoringLocationValue)

    if (selectedMonitoringLocationIndex === -1) {
      mapFlyToDefaultView(monitoringLocations, map)
    } else {
      const markerPosition = [
        marker[selectedMonitoringLocationIndex].current._latlng.lat + 0.03,
        marker[selectedMonitoringLocationIndex].current._latlng.lng,
      ]
      marker[selectedMonitoringLocationIndex].current.openPopup()
      map.flyTo(markerPosition, 13)

      const filteredTableData = allKlamathData
        .filter((data) => {
          const isWithinDateRange = filterDateRange(
            startDateValue,
            endDateValue,
            data.activity_start_date
          )
          return (
            isWithinDateRange &&
            data.monitoring_location_identifier === monitoringLocationValue &&
            data.characteristic_name === characteristicNameValue
          )
        })
        .sort((a, b) =>
          a.activity_start_date > b.activity_start_date ? 1 : -1
        )

      setFilteredKlamathData(filteredTableData)
    }
  }

  const handleResetFilters = () => {
    const defaultValues = {
      startDate: "",
      endDate: "",
      characteristicName: "",
      monitoringLocation: null,
    }
    setFilteredKlamathData(allKlamathData)
    setSelectedFilters(defaultValues)

    reset(defaultValues)
    mapFlyToDefaultView(monitoringLocations, map)
  }

  const monitoringLocationOptions = monitoringLocations.map((node, index) => ({
    key: node.monitoring_location_identifier,
    text: node.monitoring_location_identifier,
    value: node.monitoring_location_identifier,
  }))

  const [characteristicNameOptions, setCharacteristicNameOptions] = useState([])

  function generateCharacteristicNameOptions(monitoringLocationValue) {
    const selectedMonitoringLocation = monitoringLocations
      .filter(
        (ml) => monitoringLocationValue === ml.monitoring_location_identifier
      )
      .at(0)

    const characteristicNames = selectedMonitoringLocation?.params.split(",")

    const fieldOptions = characteristicNames.map((name) => {
      const itemWithCharacteristicName = allKlamathData.find(
        (data) =>
          monitoringLocationValue === data.monitoring_location_identifier &&
          data.characteristic_name === name
      )

      return {
        key: name,
        text: name,
        value: name,
        disabled: !itemWithCharacteristicName,
      }
    })
    setCharacteristicNameOptions(fieldOptions)
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns={4}>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            style={{ paddingBottom: 0 }}
          >
            <Controller
              name="monitoringLocation"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Form.Field {...field}>
                    <label>Filter Monitoring Location</label>
                    <Dropdown
                      placeholder="Select Monitoring Location"
                      fluid
                      selection
                      value={getValues("monitoringLocation") || ""}
                      options={monitoringLocationOptions}
                      onChange={(e, { value }) => {
                        field.onChange(value)
                        generateCharacteristicNameOptions(value)
                      }}
                    />
                  </Form.Field>
                  {error && (
                    <p className="form-error-message  no-margin">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            style={{ paddingBottom: 0 }}
          >
            <Controller
              name="characteristicName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Popup
                    content="Select Monitoring Location to enable field"
                    disabled={monitoringLocationValue}
                    trigger={
                      <Form.Field {...field}>
                        <label>Characteristic Name</label>
                        <Dropdown
                          disabled={!monitoringLocationValue}
                          placeholder="Select Characteristic Name"
                          fluid
                          selection
                          options={characteristicNameOptions}
                          onChange={(e, { value }) => field.onChange(value)}
                        />
                      </Form.Field>
                    }
                  />
                  {error && (
                    <p className="form-error-message  no-margin">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid.Column>

          <Grid.Column mobile={8} tablet={5} computer={5}>
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  style={{ marginBottom: 0 }}
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(new Date(date))
                  }}
                  minDate={new Date(`1980-01-01T12:00`)}
                  maxDate={new Date()}
                  customInput={
                    <Form.Input
                      label="Start Date (optional)"
                      {...field}
                      className={error ? "form-error-input" : ""}
                    />
                  }
                />
              )}
            />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={5}>
            <Controller
              name="endDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker
                    minDate={new Date(`1955-01-01T12:00`)}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={100}
                    year
                    scrollableYearDropdown
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(new Date(date))
                    }}
                    customInput={
                      <Form.Input
                        style={{ marginBottom: "1rem" }}
                        label="End Date (optional)"
                        {...field}
                        className={error ? "form-error-input" : ""}
                      />
                    }
                  />

                  {error && (
                    <p className="form-error-message  no-margin">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid.Column>
          <Grid.Column
            mobile={8}
            tablet={3}
            computer={3}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              fluid
              basic
              color="blue"
              type="button"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </Grid.Column>
          <Grid.Column
            mobile={8}
            tablet={3}
            computer={3}
            style={{ display: "flex", alignItems: "center" }}
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
