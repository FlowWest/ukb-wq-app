const sortingOptions = [
  {
    key: "Year - Descending",
    value: "Year - Descending",
    text: "Year - Descending",
    sort: function (reports) {
      return reports.sort((a, b) => +b.year - +a.year)
    },
  },
  {
    key: "Year - Ascending",
    value: "Year - Ascending",
    text: "Year - Ascending",
    sort: function (reports) {
      return reports.sort((a, b) => +a.year - +b.year)
    },
  },
  {
    key: "Title - A-Z",
    value: "Title - A-Z",
    text: "Title - A-Z",
    sort: function (reports) {
      return reports.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      )
    },
  },
  {
    key: "Title - Z-A",
    value: "Title - Z-A",
    text: "Title - Z-A",
    sort: function (reports) {
      return reports.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      )
    },
  },
]

export default sortingOptions
