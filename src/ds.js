const axios = require('axios')

/**
 * Returns a list of books (i.e. [{number, title, author}])
 *
 *
 * Fetches list of book details as one large plain text payload and parses
 * relevant data into a useable list of books.
 */
async function fetchBooks() {
  const containsBookNumberRegEx = new RegExp('[0-9]{5}', 'g')
  const containsSeperatorRegEx = new RegExp('\\s{2,}', 'g')
  const ebookNoStr = 'EBOOK NO.'
  try {
    const response = await axios.get(
      'http://www.gutenberg.org/dirs/GUTINDEX.2019'
    )
    const data = response.data
    const startingIndex = data.indexOf(ebookNoStr)
    const bookList = data
      .substring(startingIndex, data.length - 1)
      .split('\r\n')
      .filter(e => e != ebookNoStr)
      .filter(e => e != '')
      .filter(e => containsBookNumberRegEx.test(e))
      .map(e => {
        const lineItems = e.split(containsSeperatorRegEx)
        const number = lineItems[1]
        const book = lineItems[0].split(', by ')
        const title = book[0]
        const author = book[1]
        return {
          number,
          title,
          author,
        }
      })
    return bookList
  } catch (err) {
    return []
  }
}

/**
 * Returns a book by its number.
 *
 * @param {*} id
 */
async function fetchBookById(id) {
  try {
    const books = await fetchBooks()
    return books.filter(book => book.number == id)[0]
  } catch (err) {
    return {}
  }
}

/**
 * Returns a list of authors
 */
async function fetchAuthors() {
  try {
    const books = await fetchBooks()
    // console.log(books)
    return books.map(book => book.author).filter(author => author != null)
  } catch (err) {
    return []
  }
}

// module.exports.fetchBooks = fetchBooks
// module.exports.fetchBookById = fetchBookById
// module.exports.fetchAuthors = fetchAuthors
module.exports = {
  fetchBooks,
  fetchBookById,
  fetchAuthors,
}
