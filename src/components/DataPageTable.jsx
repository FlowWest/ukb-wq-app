import React from "react"
import { Header, Table, Grid, Icon, Pagination } from "semantic-ui-react"
import usePagination from "../hooks/usePagination"
import { Link } from "gatsby"

const formatDate = (date) =>
  Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date)

const DataPageTable = ({ data }) => {
  // List of common names
  const tableData = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Los Angeles",
    "Singapore",
    "Chicago",
    "Moscow",
    "Sydney",
    "Toronto",
    "Madrid",
    "Beijing",
    "Berlin",
    "Rome",
    "Istanbul",
    "Seoul",
    "Dubai",
    "Mumbai",
    "Rio de Janeiro",
    "Cairo",
    "Amsterdam",
    "Vienna",
    "Stockholm",
    "Bangkok",
    "Hong Kong",
    "San Francisco",
    "Lisbon",
    "Barcelona",
    "Buenos Aires",
    "Shanghai",
    "Mexico City",
    "São Paulo",
    "Kuala Lumpur",
    "Cape Town",
    "Seville",
    "Prague",
    "Dublin",
    "Zurich",
    "Copenhagen",
    "Athens",
    "Budapest",
    "Oslo",
    "Warsaw",
    "Brussels",
    "Helsinki",
    "Reykjavik",
    "Edinburgh",
    "Wellington",
    "Jakarta",
    "Manila",
    "Hanoi",
    "Jerusalem",
    "Amman",
    "Bogotá",
    "Lima",
    "Caracas",
    "Lagos",
    "Nairobi",
    "Delhi",
    "Kolkata",
    "Chennai",
    "Ho Chi Minh City",
    "Abu Dhabi",
    "Doha",
    "Johannesburg",
    "Cape Town",
    "Nairobi",
    "Lusaka",
    "Accra",
    "Casablanca",
    "Dakar",
    "Tunis",
    "Dar es Salaam",
    "Luanda",
    "Nouakchott",
    "Addis Ababa",
    "Tehran",
    "Baghdad",
    "Damascus",
    "Kabul",
    "Islamabad",
    "Kathmandu",
    "Colombo",
    "Dhaka",
    "Manama",
    "Muscat",
    "Kuwait City",
    "Riyadh",
    "Tashkent",
    "Ashgabat",
    "Bishkek",
    "Astana",
    "Dushanbe",
    "Ankara",
    "Nicosia",
    "Baku",
    "Yerevan",
    "Tbilisi",
    "Podgorica",
    "Belgrade",
    "Zagreb",
    "Sofia",
    "Skopje",
    "Ljubljana",
    "Tirana",
    "Pristina",
    "Sarajevo",
    // Add more cities here as needed
  ]

  const {
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
    paginatedItems,
  } = usePagination({ tableData, itemsPerPage: 9 })
  return (
    <Grid container className="weekly-upload-table">
      <Header as="h1">{data.header}</Header>
      <Table striped color="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell width={10}>Name</Table.HeaderCell>
            <Table.HeaderCell>Date Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map((info, index) => (
            <Table.Row key={info}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{info}</Table.Cell>
              <Table.Cell>
                {new Date(`7-${info.length}-2023`).toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        totalPages={numberOfPages}
        onPageChange={handlePaginationPageChange}
        defaultActivePage={currentPage}
      />
    </Grid>
  )
}

export default DataPageTable
