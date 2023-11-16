import { useState } from "react"

const usePagination = ({ tableData, itemsPerPage, sortMethod }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const paginatedItems = sortMethod
    ? sortMethod.sort(tableData).slice(firstIndex, lastIndex)
    : tableData.slice(firstIndex, lastIndex)

  const numberOfPages = Math.ceil(tableData.length / itemsPerPage)

  const handlePaginationPageChange = (e, { activePage }) => {
    setCurrentPage(activePage)
  }

  return {
    paginatedItems,
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
    setCurrentPage,
  }
}

export default usePagination
