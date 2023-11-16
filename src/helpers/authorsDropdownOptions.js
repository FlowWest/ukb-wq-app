import { getAllAuthors } from "./utils"

export const getAuthorsDropdownOptions = async () => {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    key: author.author_name,
    value: author.author_name,
    text: author.author_name,
  }))
}
