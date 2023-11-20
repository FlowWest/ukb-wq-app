import _ from "lodash"
import React, { useEffect, useRef, useReducer } from "react"
import { Search } from "semantic-ui-react"

const ReportSearch = ({ searchStringChangeHandler, setCurrentPage }) => {
  const initialState = {
    loading: false,
    value: "",
  }

  function searchReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState
      case "START_SEARCH":
        return { ...state, loading: true, value: action.query }
      case "FINISH_SEARCH":
        return { ...state, loading: false }
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection }

      default:
        throw new Error()
    }
  }

  const [searchState, dispatch] = useReducer(searchReducer, initialState)
  const { loading, value } = searchState

  const timeoutRef = useRef()

  const handleSearchChange = (e, data) => {
    clearTimeout(timeoutRef.current)
    setCurrentPage(1)
    dispatch({ type: "START_SEARCH", query: data.value })

    timeoutRef.current = setTimeout(() => {
      searchStringChangeHandler(data.value)
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" })

        return
      }

      dispatch({
        type: "FINISH_SEARCH",
      })
    }, 300)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Search
      fluid
      className="report-search-input"
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      onResultSelect={(e, data) =>
        dispatch({
          type: "UPDATE_SELECTION",
          selection: data.result.title,
        })
      }
      onSearchChange={handleSearchChange}
      open={false}
      value={value}
      placeholder="Search by Title or Author"
    />
  )
}

export default ReportSearch
