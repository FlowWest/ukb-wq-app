import { getAllAuthors } from "./utils"

export const getAuthorsDropdownOptions = (authors) => {
  console.log("🚀 ~ getAuthorsDropdownOptions ~ authors:", authors)

  // const authors = await getAllAuthors()
  return authors.map((author) => ({
    key: author.author_name,
    value: author.author_name,
    text: author.author_name,
  }))
}
