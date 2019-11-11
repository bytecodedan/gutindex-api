const express = require('express')
const router = express.Router()
const ds = require('../ds')

/**
 * Rerturns a list of books.
 *
 * Optional query parameteers:
 *   - byAuthor
 *   - byTitle
 */
router.get('/', async (req, res) => {
  const { byAuthor, byTitle } = req.query
  try {
    var books = await ds.fetchBooks()
    if (byAuthor) {
      books = books
        .filter(book => book.author != null)
        .filter(book =>
          book.author.toLowerCase().includes(byAuthor.toLowerCase())
        )
    }
    if (byTitle) {
      books = books.filter(book =>
        book.title.toLowerCase().includes(byTitle.toLowerCase())
      )
    }
    res.send(books)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * Returns a book by it's number
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const book = await ds.fetchBookById(id)
    res.send(book)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
