import _ from "lodash"
import React, { useEffect, useRef, useReducer } from "react"
import { Search } from "semantic-ui-react"

export default ({ setSearchFilteredReports, allData }) => {
  const initialState = {
    loading: false,
    results: [],
    value: "",
  }

  function searchReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState
      case "START_SEARCH":
        return { ...state, loading: true, value: action.query }
      case "FINISH_SEARCH":
        return { ...state, loading: false, results: action.results }
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection }

      default:
        throw new Error()
    }
  }

  const [searchState, dispatch] = useReducer(searchReducer, initialState)
  const { loading, results, value } = searchState
  const timeoutRef = useRef()

  const handleSearchChange = (e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: "START_SEARCH", query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" })
        setSearchFilteredReports(allData)
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i")
      const isMatch = result => re.test(`${result.title} ${result.authors}`)
      setSearchFilteredReports(_.filter(allData, isMatch))

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(allData, isMatch),
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
      loading={loading}
      onResultSelect={(e, data) =>
        dispatch({
          type: "UPDATE_SELECTION",
          selection: data.result.title,
        })
      }
      onSearchChange={handleSearchChange}
      results={results}
      open={false}
      value={value}
    />
  )
}
